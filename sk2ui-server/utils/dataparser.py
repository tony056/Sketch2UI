import base64
import os
current_path = os.path.abspath(os.path.dirname(__file__))
LABEL_SKETCH_DIR_PATH = os.path.join(current_path, '../../sk2ui-data/temp/')

def getImageData(dataStr):
    imgdata = base64.decodestring(dataStr)
    return imgdata

def saveImageRequest(imgdata, name):
    path = LABEL_SKETCH_DIR_PATH + name + '.png'
    with open(path, 'wb') as f:
        f.write(imgdata)

__all__ = ['getImageData', 'saveImageRequest', ]
