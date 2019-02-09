# from mongoengine import *
from sk2uidata import Sk2uiData


def queryAll():
    return Sk2uiData.objects().to_json()

def queryByName(name):
    return Sk2uiData.objects(name=name).to_json()

def queryById(id):
    return Sk2uiData.objects(id=id).to_json()

def fetchImageByDataId(dataId, arg):
    print(dataId)
    if arg == 'rico':
        return Sk2uiData.objects(id=dataId).first().rico_image_file.read(), 'image/jpeg'
    elif arg == 'anno':
        return Sk2uiData.objects(id=dataId).first().rico_anno_image_file.read(), 'image/png'

__all__ = ['queryAll', 'queryByName', 'queryById', 'fetchImageByDataId']
