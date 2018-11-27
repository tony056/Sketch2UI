# execution: python3 dataset_analysis.py --ps [PATH_TO_Rico_DATASET_DIR] --pc [PATH_TO_CJ_DATASET_DIR] 
#                                        --po [PATH_TO_OUTPUT_DATASET_DIR] --pm [PATH_TO_MAP_FILE]
#                                        --gm [INDICATE_TO_GENERATE_MAP] --pcjc [PATH_TO_CJ_FILES_COMPONENTS_JSON]
import json
import sys
import os
import collections
import argparse
import pdb
import random
import numpy as np
from PIL import Image

# result:
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
                        default='/Users/khzeng/Desktop/semantic_annotations', type=str)
    parser.add_argument('--pc', dest='pc',
                        help='data path to CJ dataset',
                        default='/Users/khzeng/Desktop/CJ', type=str)
    parser.add_argument('--po', dest='po',
                        help='data path to generated dataset',
                        default='/Users/khzeng/Desktop/Output', type=str)
    parser.add_argument('--pm', dest='pm',
                        help='file path to map.json',
                        default='Map.json', type=str)
    parser.add_argument('--gm', dest='gm',
                        help='whether generate new map or not',
                        default=False, type=bool)
    parser.add_argument('--pcjc', dest='pcjc',
                        help='file path to CJ_files_components.json',
                        default='CJ_files_components.json', type=str)

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
            bounds = []
            for component in components:
                label = component[0]
                com_bounds = component[1]
                try:
                    Rico_label.append(label)
                    bounds.append(com_bounds)
                    CJ_label.append(Map['Rico2CJ'][label])
                except KeyError:
                    CJ_label.append('')
                    pb_triger = True
            if pb_triger:
                Pb_files_components[filename.split('.')[0]] = {'Rico_label': Rico_label, 'CJ_label': CJ_label, 'bounds': bounds}
            else:
                CJ_files_components[filename.split('.')[0]] = {'Rico_label': Rico_label, 'CJ_label': CJ_label, 'bounds': bounds}

    if not os.path.isfile(args.pcjc):
        with open(args.pcjc, 'w') as output_file:
            json.dump(CJ_files_components, output_file, sort_keys=True, indent=4, separators=(',', ': '))
        with open('Pb_files_components.json', 'w') as output_file:
            json.dump(Pb_files_components, output_file, sort_keys=True, indent=4, separators=(',', ': '))
        
    return CJ_files_components, Pb_files_components

def generate_data(args, CJ_files_components):
    if not os.path.isdir(args.po):
        os.mkdir(args.po)
    for filename, value in CJ_files_components.items():
        components = value['CJ_label']
        positions = value['bounds']
        output = np.array([[[1.]*3]*1440]*2560)
        for ii, component in enumerate(components):
            candidates = os.listdir(args.pc + '/' + component + '/')
            position = positions[ii]
            try:
                comp_img = Image.open(args.pc + '/' + component + '/' + random.choice(candidates))
            except:
                continue
            comp_img = np.array(comp_img.resize((position[2]-1 - position[0], position[3]-1 - position[1]), Image.ANTIALIAS))
            comp_img = comp_img / 255.
            output[position[1]:position[3]-1, position[0]:position[2]-1, :] *= comp_img
        output = Image.fromarray(np.uint8(output * 255.))
        output.save(args.po + '/' + filename + '.jpg')

def generate_map(MAP_DIR):
    CJ2Rico = {'Images': ['Background Image', 'Image', 'Web View', 'Video', 'Map View'], 'Text': ['Text'], 'Radio_Button': ['Radio Button', 'On/Off Switch'], 'Input': ['Input'], 'CheckBox': ['Checkbox'], 'Slider': ['Slider'], 'Button': ['Text Button'], 'Icon': ['Icon'], 'Pager_Indicator': ['Pager Indicator']}
    Rico2CJ = {val: key for key, vals in CJ2Rico.items() for val in vals}
    Map = {'CJ2Rico': CJ2Rico, 'Rico2CJ': Rico2CJ}
    with open(MAP_DIR, 'w') as output_file:
        json.dump(Map, output_file, sort_keys=True, indent=4, separators=(',', ': '))
    return Map

def main(args):
    DATASET_PATH = args.ps
    MAP_DIR = args.pm
    if args.gm:
        Map = generate_map(MAP_DIR)
    else:
        if os.path.isfile(MAP_DIR):
            Map = json.load(open(MAP_DIR, 'r'))
        else:
            Map = generate_map(MAP_DIR)
    
    if not os.path.isfile(args.pcjc):
        CJ_files_components, Pb_files_components = parse_json_files(args, Map)
    else:
        CJ_files_components = json.load(open(args.pcjc, 'r'))

    generate_data(args, CJ_files_components)
    print('done')

if __name__ == '__main__':
    args = parse_args()
    main(args)
