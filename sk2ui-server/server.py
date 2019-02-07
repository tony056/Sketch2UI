from flask import Flask, request

app = Flask(__name__)

@app.route('/apis')
def getAPIs():
    return "testing..."

@app.route('api/create', methods=['POST'])
def create():
    assert request.method == 'POST'

@app.route('api/query', methods=['POST'])
def query():
    assert request.method == 'POST'

@app.route('api/classes', methods=['GET'])
def getClasses():
    return



if __name__ == "__main__":
    app.run()
