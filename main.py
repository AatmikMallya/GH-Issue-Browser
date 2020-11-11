from flask import Flask, render_template, make_response, send_file, abort, jsonify, request
from time import sleep
import os

app = Flask(__name__, static_folder='ng/dist/ng', static_url_path='')

# Route definitions
@app.route('/')
def home():
    return make_response(open('ng/dist/ng/index.html').read())

@app.route('/api/issues')
def get_issues():
	pass

@app.route('/api/issue_data')
def get_issue_data():
	pass

@app.errorhandler(404)
def not_found_error(error):
    return make_response(open('ng/dist/ng/index.html').read())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
