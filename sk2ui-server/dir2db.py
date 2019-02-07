import json
from sk2ui_db import *

RICO_DATA_DIR = '/Users/tonytung/Downloads/combined/'
RICO_ANNO_DATA_DIR = '/Users/tonytung/Downloads/semantic_annotations/'
RICO_LABELS = []
with open(RICO_ANNO_DATA_DIR + 'component_legend.json', 'r') as label_file:
    data = json.load(label_file, encoding='utf-8')
    RICO_LABELS = list(data.keys())
    RICO_LABELS = [x.encode('utf-8') for x in RICO_LABELS]
    RICO_LABELS.append('Icon')
    RICO_LABELS.sort()

db_keys = ['rico_ad',
        'rico_bg_image',
        'rico_bottom_nav',
        'rico_btn_bar',
        'rico_card',
        'rico_checkbox',
        'rico_date_picker',
        'rico_drawer',
        'rico_icon',
        'rico_image',
        'rico_input',
        'rico_list_item',
        'rico_map_view',
        'rico_modal',
        'rico_multi_tab',
        'rico_num_stepper',
        'rico_switch',
        'rico_pager_indicator',
        'rico_radio_btn',
        'rico_slider',
        'rico_text',
        'rico_text_btn',
        'rico_toolbar',
        'rico_video',
        'rico_web_view']
RICO_LABELS_TO_DB_KEYS = {}
for i in range(0, len(RICO_LABELS)):
    label = RICO_LABELS[i]
    key = db_keys[i]
    RICO_LABELS_TO_DB_KEYS[label] = key

indexRange = [0, 20]

class DataSaver():
    def __init__(self):
        self.curIndex = 0
        self.labels = dict((k, []) for k in RICO_LABELS)
        self.dbObj = None

    def clear(self):
        self.labels = dict((k, []) for k in RICO_LABELS)
        self.dbObj = None

    def updateLabels(self, label, bbox):
        old_values = self.labels.get(label, [])
        old_values.append(bbox)
        self.labels[label] = old_values

    def updateSaver(self, newIndex):
        self.curIndex = newIndex
        self.dbObj = Sk2uiData(name=str(self.curIndex))

    def initDbObj(self, anno_file_path, img_file_path):
        rico_img = open(img_file_path, 'r')
        anno_img = open(anno_file_path, 'r')
        if not self.dbObj:
            self.dbObj = Sk2uiData(name=str(self.curIndex))
        self.dbObj.rico_image_file.put(rico_img)
        self.dbObj.rico_anno_image_file.put(anno_img)

    def saveLabelsToDb(self):
        for key in self.labels:
            db_label = RICO_LABELS_TO_DB_KEYS[key]
            values = self.labels.get(key, [])
            self.dbObj[db_label] = values
        self.dbObj.save()
        self.clear()

def load_component(comp, saver):
    if 'children' in comp:
        load_components(comp['children'], saver)
    if 'componentLabel' in comp and 'bounds' in comp:
        label = comp['componentLabel']
        bounds = comp['bounds']
        saver.updateLabels(label, bounds)

def load_components(comps, saver):
    for component in comps:
        load_component(component, saver)


def load_labels_from_file(label_file_path):
    dataSaver = DataSaver()
    with open(label_file_path, 'r') as jsonFile:
        # one image
        data = json.load(jsonFile)
        load_component(data, dataSaver)
    return dataSaver

def main():
    l, r = indexRange
    prefix = 'mini_test/'
    # db.db_connect()
    db_connect()
    for i in range(l, r + 1):
        img_file_path = RICO_DATA_DIR + str(i) + '.jpg'
        anno_file_path = RICO_ANNO_DATA_DIR + prefix + str(i) + '.png'
        label_file_path = RICO_ANNO_DATA_DIR + prefix + str(i) + '.json'
        dataSaver = load_labels_from_file(label_file_path)
        dataSaver.updateSaver(i)
        dataSaver.initDbObj(anno_file_path, img_file_path)
        dataSaver.saveLabelsToDb()


if __name__ == '__main__':
    main()
