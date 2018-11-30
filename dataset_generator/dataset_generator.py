# execution: python3 dataset_analysis.py --ps [PATH_TO_Rico_DATASET_DIR] --pc [PATH_TO_CJ_DATASET_DIR]
#                                        --po [PATH_TO_OUTPUT_DATASET_DIR] --pm [PATH_TO_MAP_FILE]
#                                        --gm [INDICATE_TO_GENERATE_MAP] --pcjc [PATH_TO_CJ_FILES_COMPONENTS_JSON]
#                                        --pa [PATH_TO_OUTPUT_ANATATIONS] --nv [NUMBER_OF_VALIDATION_DATA]
import json
import sys
import os
import fnmatch
import collections
import argparse
import pdb
import random
import datetime
import numpy as np
from PIL import Image

# result:
#     annotations.json
#     0.jpg,
#     1.jpg,
#       ...

def parse_args():
    """
    Parse input arguments
    """
    parser = argparse.ArgumentParser(description='Data Generator')
    parser.add_argument('--ps', dest='ps',
                        help='data path to Rico dataset',
                        default='/home/khzeng/exp/SK2UI/semantic_annotations', type=str)
    parser.add_argument('--pc', dest='pc',
                        help='data path to CJ dataset',
                        default='/home/khzeng/exp/SK2UI/CJ', type=str)
    parser.add_argument('--po', dest='po',
                        help='data path to generated dataset',
                        default='/home/khzeng/exp/SK2UI/Output', type=str)
    parser.add_argument('--pm', dest='pm',
                        help='file path to map.json',
                        default='Map.json', type=str)
    parser.add_argument('--gm', dest='gm',
                        help='whether generate new map or not',
                        default=False, type=bool)
    parser.add_argument('--pcjc', dest='pcjc',
                        help='file path to CJ_files_components.json',
                        default='CJ_files_components.json', type=str)
    parser.add_argument('--pat', dest='pat',
                        help='file path to train annotations.json',
                        default='train_annotations.json', type=str)
    parser.add_argument('--pav', dest='pav',
                        help='file path to validation annotations.json',
                        default='val_annotations.json', type=str)
    parser.add_argument('--nv', dest='nv',
                        help='number of validation data we want to generate',
                        default=300, type=int)

    args = parser.parse_args()
    return args

def display_loading(count, base, file_num):
    if count % base == 0:
        print('{0}/{1}'.format(count, file_num))

def traverse_tree(root):
    if 'children' in root.keys():
        output = []
        for child in root['children']:
            output += traverse_tree(child)
    else:
        output = (root['componentLabel'], root['bounds'])
    return output

def parse_json_files(args, Map):
    path = args.ps
    CJ_files_components = collections.defaultdict(list)
    Pb_files_components = collections.defaultdict(list)
    if not os.path.isdir(path):
        print('Please input the path to the dir of the dataset!')
        return
    print('parsing........')
    files = os.listdir(path)
    file_num = len(files)
    base = file_num // 10
    count = 0
    for filename in files:
        count += 1
        pb_triger = False
        display_loading(count, base, file_num)
        if not filename.endswith('.json'):
            continue
        index = filename.split('.')[0]
        if not index.isdigit():
            continue
        with open(path + '/' + filename, 'r') as json_file:
            data = json.load(json_file)
            if 'children' not in data:
                print('the file without child components: {0}'.format(filename))
                continue
            components = traverse_tree(data)
            components = [(components[ii * 2], components[ii * 2 + 1]) for ii in range(len(components) // 2)]
            Rico_label = []
            CJ_label = []
            CJ_class = []
            bounds = []
            for component in components:
                label = component[0]
                com_bounds = component[1]
                try:
                    Rico_label.append(label)
                    bounds.append(com_bounds)
                    CJ_label.append(Map['Rico2CJ'][label].keys()[0])
                    CJ_class.append(Map['Rico2CJ'][label].values()[0])
                except KeyError:
                    CJ_label.append('')
                    CJ_class.append('')
                    pb_triger = True
            if pb_triger:
                Pb_files_components[filename.split('.')[0]] = {'Rico_label': Rico_label, 'CJ_label': CJ_label, 'CJ_class': CJ_class, 'bounds': bounds}
            else:
                CJ_files_components[filename.split('.')[0]] = {'Rico_label': Rico_label, 'CJ_label': CJ_label, 'CJ_class': CJ_class, 'bounds': bounds}

    if not os.path.isfile(args.pcjc):
        with open(args.pcjc, 'w') as output_file:
            json.dump(CJ_files_components, output_file, sort_keys=True, indent=4, separators=(',', ': '))
        with open('Pb_files_components.json', 'w') as output_file:
            json.dump(Pb_files_components, output_file, sort_keys=True, indent=4, separators=(',', ': '))

    return CJ_files_components, Pb_files_components

def get_categories_list(Map):
    # get categories information for entire dataset from CJ2Rico Map
    Map = Map['CJ2Rico']
    output = []
    for k, v in Map.items():
        for sub_k, sub_v in v.items():
            output.append({'Rico_category': sub_v, 'id': int(k), 'name': sub_k})
    return output

def generate_dataset_info():
    # generate entire dataset information
    output = {}
    output['description'] = 'SK2UI Dataset'
    output['url'] = 'https://github.com/tony056/Sketch2UI'
    output['version'] = 'beta'
    output['year'] = '2018'
    output['contributor'] = 'Tony, Hao, Han'
    output['date_created'] = datetime.datetime.now().strftime("%y-%m-%d %H:%M")
    return output

def init_anno(Map):
    # initialize annotation dictionary
    components_label = collections.defaultdict(list)
    components_label['annotations'] = []
    components_label['images'] = []
    components_label['categories'] = get_categories_list(Map)
    components_label['info'] = generate_dataset_info()
    return components_label

def check_invaild_bbox(position):
    # ignore the component that component's area less than 25 and width/height less than 5
    x, y, maxX, maxY = position
    width = maxX - x - 1
    height = maxY - y - 1
    area = width * height
    if area < 25 or width < 5 or height < 5:
        return True
    else:
        return False

def encode_img_info(filename):
    # encode image information
    output = {}
    output['file_name'] = filename + '.jpg'
    output['width'] = 1440
    output['height'] = 2560
    output['id'] = int(filename)
    output['date_generated'] = datetime.datetime.now().strftime("%y-%m-%d %H:%M")
    return output

def generate_annotation_obj(position, filename, category_id, id):
    # generate element annotation object for each bbox
    x, y, maxX, maxY = position
    width = maxX - x - 1
    height = maxY - y - 1
    image_id = filename if type(filename) == int else int(filename)
    assert type(category_id) == int
    assert type(id) == int
    obj = {
        'bbox': [x, y, width, height],
        'image_id': image_id,
        'category_id': category_id,
        'id': id,
        'area': float(width * height),
        'iscrowd': 0,
        'segmentation': bbox2poly([x, y, width, height])
    }
    return obj

def bbox2poly(bbox):
    # generate polygon representation for bbox
    x, y, width, height = bbox
    output = [[x, y, x, y + height, x + width, y, x + width, y  + height]]
    return output

def generate_data(args, CJ_files_components, Map):
    # here we go, generate data!
    if not os.path.isdir(args.po):
        os.mkdir(args.po)
    train_components_label = init_anno(Map)
    val_components_label = init_anno(Map)
    Pb_components_label = init_anno(Map)
    cnt, count, file_num = 0, 0, len(CJ_files_components.keys())
    base = file_num // 10

    print('generating........')
    for filename, value in CJ_files_components.items():
        Pb_triger = False
        components, classes, positions = value['CJ_label'], value['CJ_class'], value['bounds']
        output = np.array([[[1.]*3]*1440]*2560)
        annotation_objs = []

        for ii, component in enumerate(components):
            candidates = fnmatch.filter(os.listdir(args.pc + '/' + component + '/'), '*.jpg')
            position = positions[ii]
            comp_img = Image.open(args.pc + '/' + component + '/' + random.choice(candidates))
            if check_invaild_bbox(position):
                continue

            # an ugly way to deal with the noise inside the Rico dataset
            try:
                width = position[2] - 1 - position[0]
                height = position[3] - 1 - position[1]
                comp_img = comp_img.resize((width, height), Image.ANTIALIAS)
                comp_img = np.array(comp_img) / 255.
                output[position[1]:position[3]-1, position[0]:position[2]-1, :] *= comp_img
            except:
                Pb_triger = True
            anno_obj = generate_annotation_obj(position, filename, classes[ii], cnt)
            annotation_objs.append(anno_obj)

            cnt += 1

        # if there are some valid bboxes inside the image,
        # store the information to Pb_, otherwise, store to anno.
        if Pb_triger:
            for anno_obj in annotation_objs:
                Pb_components_label['annotations'].append(anno_obj)
            Pb_components_label['images'].append(encode_img_info(filename))
        else:
            # if the number of validation data is less than agrs.nv,
            # toss a coin to decide this data belong to train or val
            if len(val_components_label['images']) < args.nv and random.random > 0.7:
                for anno_obj in annotation_objs:
                    val_components_label['annotations'].append(anno_obj)
                val_components_label['images'].append(encode_img_info(filename))
            else: 
                for anno_obj in annotation_objs:
                    train_components_label['annotations'].append(anno_obj)
                train_components_label['images'].append(encode_img_info(filename))

        # save the generated image
        output = Image.fromarray(np.uint8(output * 255.))
        output.save(args.po + '/' + filename + '.jpg')

        # counting and show
        count += 1
        if count > 3300:
            break
        display_loading(count, base, file_num)

    # write out the anno and pb_anno
    with open(args.pat, 'w') as output_file:
        json.dump(train_components_label, output_file, sort_keys=True, indent=4, separators=(',', ': '))
    with open(args.pav, 'w') as output_file:
        json.dump(val_components_label, output_file, sort_keys=True, indent=4, separators=(',', ': '))
    with open('Pb_anatations.json', 'w') as output_file:
        json.dump(Pb_components_label, output_file, sort_keys=True, indent=4, separators=(',', ': '))

    return train_components_label, val_components_label, Pb_components_label

def generate_map(MAP_DIR):
    # generate mapping from CJ to Rico and from Rico to CJ
    # CJ2Rico
    CJ2Rico = {3: {'Images': ['Background Image', 'Image', 'Web View', 'Video', 'Map View']},\
               8: {'Text': ['Text']}, 6: {'Radio_Button': ['Radio Button', 'On/Off Switch']},\
               4: {'Input': ['Input']}, 1: {'CheckBox': ['Checkbox']}, 7: {'Slider': ['Slider']},\
               0: {'Button': ['Text Button']}, 2: {'Icon': ['Icon']}, 5: {'Pager_Indicator': ['Pager Indicator']}}

    # Rico2CJ
    Rico2CJ = {}
    for label, CJ in CJ2Rico.items():
        for CJ_label, Rico_labels in CJ.items():
            for Rico_label in Rico_labels:
                Rico2CJ[Rico_label] = {CJ_label: label}

    # overall
    Map = {'CJ2Rico': CJ2Rico, 'Rico2CJ': Rico2CJ}

    # write the mapping dictionary
    with open(MAP_DIR, 'w') as output_file:
        json.dump(Map, output_file, sort_keys=True, indent=4, separators=(',', ': '))

    return Map

def main(args):
    DATASET_PATH = args.ps
    MAP_DIR = args.pm

    # get mapping dicationary
    if args.gm:
        Map = generate_map(MAP_DIR)
    else:
        if os.path.isfile(MAP_DIR):
            Map = json.load(open(MAP_DIR, 'r'))
        else:
            Map = generate_map(MAP_DIR)

    # get file and component information first
    if not os.path.isfile(args.pcjc):
        CJ_files_components, Pb_files_components = parse_json_files(args, Map)
    else:
        CJ_files_components = json.load(open(args.pcjc, 'r'))

    # start to generate data
    train_components_label, val_components_label, Pb_components_label = generate_data(args, CJ_files_components, Map)
    print('done')

if __name__ == '__main__':
    args = parse_args()
    main(args)
