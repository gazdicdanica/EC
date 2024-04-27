from re import sub
from flask import Flask, jsonify, request
import pymongo, json
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, join_room
import lama_requests


db = None
socketio = None


def get_content(response):
    try:
        print("resp")
        print(response)
        return True, response["choices"][0]["message"]["content"]
    except Exception as e:
        print("Error in get_content: ", e)
        return False, response

def create_app():
    global db, socketio
    app = Flask(__name__)
    app.config['DEBUG'] = False

    CORS(app)
    
    socketio = SocketIO(app)
    socketio.init_app(app, cors_allowed_origins="*")

    client = MongoClient(host='mongodb',
                        port=27017, 
                        username='root', 
                        password='pass',)
    db = client["mongodb"]

    @app.route('/')
    @cross_origin()
    def ping_server():
        return "Welcome to the world of learning."

    @app.route('/login', methods=['POST'])
    @cross_origin()
    def login_user():
        if(request.is_json):
            try:
                user_data = request.json
                collection = db["users"]
                user = collection.find_one({"email": user_data.get("email"), "password": user_data.get("password")})
                if user:
                    return jsonify({"message": "User authenticated"}), 200
                else:
                    print("Invalid email or password")
                    return jsonify({"error": "Invalid email or password"}), 400
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        else:
            print("Request body must be JSON")
            return jsonify({"error": "Request body must be JSON"}), 400

    @app.route('/register', methods=['POST'])
    def register_user():
        if request.is_json:
            # Extract JSON data from the request body
            try:
                user_data = request.json
                collection = db["users"]
                # TODO check if email is already in use
                result = collection.insert_one({"email":user_data.get("email"), "password":user_data.get("password")})
                if result.inserted_id:
                    return jsonify({"message": "User registered successfully"}), 201
                else:
                    return jsonify({"error": "Failed to register user"}), 500
            except Exception as e:
                return jsonify({"error": str(e)}), 500
        else:
            return jsonify({"error": "Request body must be JSON"}), 400
        

    @app.route('/question', methods=['POST'])
    def get_question():
        if request.is_json:
            try:
                data = request.json
                subject = data.get("subject")
                difficulty = data.get("difficulty")
                module = data.get("module")
                user = data.get("email")

                questions_collection = db["questions"]
                subject = questions_collection.find_one({"subject": subject})
                if subject:
                    llamaaa_response = lama_requests.get_question(subject, difficulty, module, subject["questions"])
                else:
                    llamaaa_response = lama_requests.get_question(subject, difficulty, module, subjec)
                return jsonify({"question": llamaaa_response})

            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Request body must be JSON"}), 400


    @app.route('/ask_me_about_topic', methods=['POST'])
    def ask_me_about_topic():
        if request.is_json:
            try:
                user_data = request.json
                topic = user_data.get("topic")
                difficulty = user_data.get("difficulty")
                n = user_data.get("num")
                fromLlama = lama_requests.ask_me_n_questions_on_subject(n, topic, difficulty)
                return jsonify({"questions": lama_requests.extract_questions_from_response(fromLlama)}), 200
            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Request body must be JSON"}), 400
        

    @app.route('/check_answer_for_topic', methods=['POST'])
    def check_answer_for_topic():
        if request.is_json:
            try:
                user_data = request.json
                answer = user_data.get("answer")
                question = user_data.get("question")
                precision = None
                fromLlama = None

                if user_data.get("precision"):
                    precision = user_data.get("precision")
                    fromLlama = lama_requests.check_answer_for_question(answer, question, precision)
                else:
                    fromLlama = lama_requests.check_answer_for_question(answer, question)

                flag, fromLlama = get_content(fromLlama)

                return jsonify({
                    "answer": True if "Y" in fromLlama else False,
                    "correct_json": flag,
                    "questions": fromLlama, 
                    }), 200
            

            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Request body must be JSON"}), 400
        

    @app.route('/get_answer_for_my_question', methods=['POST'])
    def answer_my_question():
        if request.is_json:
            try:
                user_data = request.json
                question = user_data.get("question")
                generalization_coefficient = None
                fromLlama = None

                if user_data.get("generalization_coefficient"):
                    generalization_coefficient = user_data.get("generalization_coefficient")
                    fromLlama = lama_requests.answer_question(question, generalization_coefficient)
                else:
                    fromLlama = lama_requests.answer_question(question)

                flag, fromLlama = get_content(fromLlama)

                return jsonify({
                    "correct_json": flag,
                    "questions": fromLlama, 
                    }), 200
            

            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Request body must be JSON"}), 400


    @app.route('/analyze_test', methods=['POST'])
    def analyze_test_results():
        if request.is_json:
            try:
                user_data = request.json
                question_and_answers = user_data.get("questionAnswerDatamap")
                fromLlama = None

                fromLlama = lama_requests.analyze_test(question_and_answers)

                flag, fromLlama = get_content(fromLlama)

                return jsonify({
                    "correct_json": flag,
                    "test_results": fromLlama, 
                    }), 200
            

            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "Request body must be JSON"}), 400


    @app.route('/analyze_user_performance', methods=['GET'])
    def analyze_user_performace():
        try:
            user_data = request.json
            tests = user_data.get("test_data")
            fromLlama = None

            fromLlama = lama_requests.analyze_performance(tests)

            flag, fromLlama = get_content(fromLlama)

            return jsonify({
                "correct_json": flag,
                "user_performace": fromLlama, 
                }), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 400


    return app    
        

if __name__=='__main__':
    global app
    app = create_app()
    app.run(host="0.0.0.0", port=5000)


@socketio.on('subscribe')
def handle_subscribe(topic):
    join_room(topic)
    print(f"Subscribed to {topic}")
