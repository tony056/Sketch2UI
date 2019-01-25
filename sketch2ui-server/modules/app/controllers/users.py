import os
from flask import request, jsonify
from app import app, mongo
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == 'GET':
        query = request.args
        data = mongo.db.users.find_one(query)
        return jsonify(data), 200

    data = request.get_json()
    if request.method == 'POST':
        if data.get('name', None) and data.get('email', None):
            mongo.db.users.insert_one(data)
            return jsonify({'ok': True, 'message': 'user created'}), 200
        else:
            return jsonify({'ok': False, 'message': 'bad request params'}), 400
    
