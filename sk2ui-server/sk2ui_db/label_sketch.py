from mongoengine import *
from datetime import datetime
from utils import getImageData, saveImageRequest
import StringIO

class LabelSketch(Document):
    image_file = ImageField(required=True)
    rico_label= StringField(required=True)
    file_name = StringField(required=True)
    created_time = DateTimeField(default=datetime.utcnow())

def createLabelSketch(label, name, image):
    sketch = LabelSketch()
    sketch.file_name = name
    sketch.rico_label = label
    imagedata = getImageData(image)
    saveImageRequest(imagedata, name)
    sketch.image_file.put(StringIO.StringIO(imagedata))
    sketch.save()



__all__ = ['LabelSketch', 'createLabelSketch',]
