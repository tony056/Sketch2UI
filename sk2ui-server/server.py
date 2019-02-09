from flask import Flask, request, jsonify
from flask_mongoengine import MongoEngine
from sk2ui_db import *

def create_app():

    app = Flask(__name__)
    app.config['MONGODB_DB'] = 'sk2ui'
    db = MongoEngine(app)

    @app.route('/apis')
    def getAPIs():
        return "testing..."

    @app.route('/api/create', methods=['POST'])
    def create():
        assert request.method == 'POST'

    @app.route('/api/query', methods=['POST', 'GET'])
    def query():
        if request.method == 'GET':
            queryName = request.args.get('name')
            queryId = request.args.get('id')
            if not queryName and not queryId:
                print('fetch all')
                results = queryAll()
                return jsonify(results)
            else:
                result = []
                if queryName:
                    result = queryByName(queryName)
                elif queryId:
                    result = queryById(queryId)
                return jsonify(result)

    @app.route('/api/images', methods=['GET'])
    def fetchImage():
        dataId = request.args.get('id')
        arg = request.args.get('arg')
        content, content_type = fetchImageByDataId(dataId, arg)
        # response.content_type = content_type
        return content


    @app.route('/api/classes', methods=['GET'])
    def getClasses():
        return

    return app

if __name__ == "__main__":
    app = create_app()
    app.run()
