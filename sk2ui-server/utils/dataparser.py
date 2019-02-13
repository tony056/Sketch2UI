import base64
LABEL_SKETCH_DIR_PATH = '/Users/tonytung/Documents/Sketch2UI/sk2ui-data/temp/'

def getImageData(dataStr):
    imgdata = base64.decodestring(dataStr)
    return imgdata

def saveImageRequest(imgdata, name):
    path = LABEL_SKETCH_DIR_PATH + name + '.png'
    with open(path, 'wb') as f:
        f.write(imgdata)

__all__ = ['getImageData', 'saveImageRequest', ]
