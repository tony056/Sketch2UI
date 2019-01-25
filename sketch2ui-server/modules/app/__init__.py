''' flask app with mongo '''
import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)

# create teh flask object
app = Flask(__name__)

app.config['MONGO_URI'] = os.environ.get('DB')
mongo = PyMongo(app)

app.json_encoder = JSONEncoder

from app.controllers import *
