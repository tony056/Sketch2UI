from sk2uidata import Sk2uiData
import json

def getRicoLabels():
    data = Sk2uiData.objects().first().to_json()
    labels = []
    data = json.loads(data)
    for k in data.keys():
        if '_' in k and 'file' not in k and k != '_id':
            labels.append(k.encode('utf-8'))
    return labels


__all__ = ['getRicoLabels', ]
