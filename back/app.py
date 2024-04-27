from flask import Flask, jsonify
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

def get_db():
    client = MongoClient(host='test_mongodb',
                         port=27017, 
                         username='root', 
                         password='pass',
                        authSource="admin")
    db = client["db"]
    return db

@app.route('/')
def ping_server():
    return "Welcome to the world of learning."

if __name__=='__main__':
    app.run(host="0.0.0.0", port=5000)