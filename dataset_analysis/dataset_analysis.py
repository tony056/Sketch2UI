# execution: python3 dataset_analysis.py [PATH_TO_DATASET_DIR] [REPORT_NAME](optional)
import json
import sys
import os
import collections

# result {
#     'classes_per_image': N,
#     'images_per_class': N,
#       ...
# }

def display_loading(count, base, file_num):
    if count % base == 0:
        print('{0}/{1}'.format(count, file_num))

def parse_json_files(path):
    com_table = collections.defaultdict(list)
    file_table = collections.defaultdict(list)
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
            components = data['children']
            for component in components:
                label = component['componentLabel']
                com_table[label].append(int(index))
                file_table[index].append(label)
    return file_table, com_table

def write_result_to_file(name, file_table, com_table, optional=False):
    print('writing the result........')
    file_num = len(file_table.keys())
    com_num = len(com_table.keys())
    total_components = 0
    for index in file_table:
        total_components += len(file_table[index])

    components_per_image = total_components / file_num
    classes_per_image = sum([len(set(item[1])) for item in file_table.items()]) / file_num
    images_per_class = sum([len(set(item[1])) for item in com_table.items()]) / com_num
    result = {
        'total_file': file_num,
        'total_components': total_components,
        'total_component_classes': com_num,
        'components_per_image': components_per_image,
        'classes_per_image': classes_per_image,
        'images_per_class': images_per_class,
    }
    if optional:
        result['component_table'] = com_table
        # add additional data into the result

    with open(name + '.json', 'w') as output_file:
        json.dump(result, output_file, sort_keys=True, indent=4, separators=(',', ': '))

def main():
    REPORT_NAME = 'dataset_analysis'
    if len(sys.argv) < 2:
        print('Please put the path to the dataset dir as the parameter before execution.')
        return
    DATASET_PATH = sys.argv[1]
    if len(sys.argv) == 3:
        REPORT_NAME = sys.argv[2]
    file_table, com_table = parse_json_files(DATASET_PATH)
    write_result_to_file(REPORT_NAME, file_table, com_table)
    print('done')

if __name__ == '__main__':
    main()
