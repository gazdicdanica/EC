from flask import Flask, jsonify, request
import pymongo
from pymongo import MongoClient

app = Flask(__name__)

def get_db():
    client = MongoClient(host='mongodb',
                         port=27017, 
                         username='root', 
                         password='pass',)
    db = client["mongodb"]
    return db

@app.route('/')
def ping_server():
    return "Welcome to the world of learning."

@app.route('/login', methods=['POST'])
def login_user():
    if(request.is_json):
        try:
            user_data = request.json
            db = get_db()
            collection = db["users"]
            user = collection.find_one({"email": user_data.get("email"), "password": user_data.get("password")})
            if user:
                return jsonify({"message": "User authenticated"}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Request body must be JSON"}), 400

@app.route('/register', methods=['POST'])
def register_user():
    if request.is_json:
        # Extract JSON data from the request body
        try:
            user_data = request.json
            db = get_db()
            collection = db["users"]
            result = collection.insert_one({"email":user_data.get("email"), "password":user_data.get("password")})
            if result.inserted_id:
                return jsonify({"message": "User registered successfully"}), 201
            else:
                return jsonify({"error": "Failed to register user"}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Request body must be JSON"}), 400

if __name__=='__main__':
    app.run(host="0.0.0.0", port=5000)