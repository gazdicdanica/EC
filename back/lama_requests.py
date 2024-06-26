from llamaapi import LlamaAPI
import re

llama = LlamaAPI("LL-OMRR5S1cTUrbM3Bv1bq5Y3CVx9PGpwWPLoFtAVCJVWFPqwAT9eqCqVQuE2pB0ra6")

def remove_emojis(data):
    emoj = re.compile("["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U00002500-\U00002BEF"  # chinese char
        u"\U00002702-\U000027B0"
        u"\U000024C2-\U0001F251"
        u"\U0001f926-\U0001f937"
        u"\U00010000-\U0010ffff"
        u"\u2640-\u2642" 
        u"\u2600-\u2B55"
        u"\u200d"
        u"\u23cf"
        u"\u23e9"
        u"\u231a"
        u"\ufe0f"  # dingbats
        u"\u3030"
                      "]+", re.UNICODE)
    return re.sub(emoj, '', data)


def add_past_answers(msg: str, past: list[str]):
    if len(past) != 0:
        msg += " But the answer is not like "
        for q in past:
            msg += q + " or like "
        msg = msg[:-len(" or like ")]
    return msg

def get_wrong_answer(question: str, past_answers: list[str]):
    system_msg = "You are a serious assistant and you dont use smileys"
    usr_msg = f"Answer this question as short as posible but alter it to make it seem correct but is actually false: {question}"
    usr_msg = add_past_answers(usr_msg, past_answers)
    usr_msg += "Dont use any emojis please"

    api_request_json = {
        'model': 'llama-13b-chat',
        "messages": [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": usr_msg},
        ],
    }

    response = llama.run(api_request_json)
    output = response.json()['choices'][0]['message']
    return remove_emojis(output["content"])

def get_answer(question: str):
    system_msg = "You are a serious assistant that gives answers that are as concise as possible"
    usr_msg = f"Answer this question as short as possible: {question}"
    usr_msg += "Dont use any emojis please"

    api_request_json = {
        'model': 'llama-13b-chat',
        "messages": [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": usr_msg},
        ],
    }

    response = llama.run(api_request_json)
    output = response.json()['choices'][0]['message']
    return output["content"]

def get_question(subject: str, difficulty: str, module: str, past_questions: list[str] = []): 
    system_msg = "You are a serious assistant that gives answers that are as concise as possible"
    usr_msg = f"Give me one {difficulty} question about {module} from {subject}.\
            Make it as short as possible"
    usr_msg = add_past_answers(usr_msg, past_questions)
    usr_msg += "Be as concise as possible! \
            Dont start with: Sure! Here is so and so or something similar"
    api_request_json = {
        'model': 'llama-13b-chat',
        "messages": [
            {"role": "system", "content": system_msg},
            {"role": "user", "content": usr_msg},
        ],
    }
    response = llama.run(api_request_json)
    output = response.json()['choices'][0]['message']
    return output["content"]

def create_n_questions_with_m_answers_where_first_is_correct(subject, sub_type,  school_grade, difficulty="medium", num_questions=5, num_answers=3):
    #subject = "Math"            # biology, english language
    #sub_type = "division"       # Specific field for subject
    #school_grade = "4"          # Razred koji osoba pohadja
    api_request_json = {
            "messages": [
                {"role": "user", "content": f"Generate '{num_questions}' '{difficulty}' questions on subject '{subject}', specifically on '{sub_type}' for '{school_grade}' grade and provide every question with '{num_answers}' answers where first one is correct."},
            ],
            "functions": [
                {
                    "name": "generate_questions",
                    "description": "Generate multiple-choice questions on a given subject and difficulty level.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "subject": {"type": "string", "description": "The subject of the questions."},
                            "difficulty": {"type": "string", "enum": ["easy", "medium", "hard"], "description": "The difficulty level of the questions."},
                            "num_questions": {"type": "number", "description": "The number of questions to generate."},
                            "sub_type": {"type": "string", "description": "Specific subtype of subject."},
                            "school_grade": {"type": "string", "description": "Level of persons knowledge."},
                            "num_answers": {"type": "number", "description": "The number of answers to generate."}
                        },
                    },
                    "required": ["subject", "difficulty", "num_questions", "sub_type", "school_grade", "num_answers"],
                }
            ],
            "stream": False,
            "function_call": "generate_questions",
            "language": "en"
        }

    response = llama.run(api_request_json)
    
    return response.json()


def ask_me_n_questions_on_subject(n, subject, difficulty):
    api_request_json = {
          "messages": [
              {"role": "user", "content": f"Generate '{n}' questions on the subject with '{difficulty}' difficulty level: '{subject}'."},
          ],
          "functions": [
              {
                  "name": "generate_questions",
                  "description": "Generate multiple-choice questions on a given subject and difficulty level.",
                  "parameters": {
                      "type": "object",
                      "properties": {
                          "subject": {"type": "string", "description": "The subject of the questions."},
                          "difficulty": {"type": "string", "enum": ["easy", "medium", "hard"], "description": "The difficulty level of the questions."},
                          "num_questions": {"type": "number", "description": "The number of questions to generate."},
                      },
                  },
                  "required": ["subject", "num_questions", "difficulty"],
              }
          ],
          "stream": False,
          "function_call": "generate_questions",
            "language": "en"
      }
    response = llama.run(api_request_json)
    
    return response.json()
    

def extract_questions_from_response(response):
    print(response)
    if "choices" in response and response["choices"]:
        message = response["choices"][0]["message"]
        if message["role"] == "assistant" and message["content"]:
            questions_content = message["content"].split("\n\n")[1].strip()
            questions = questions_content.split("\n")
            return questions
    return None


def check_answer_for_question(answer, question, precision=0.7):
    message = f"Is '{answer}' the correct answer for the question: '{question}'? Take into consideration that answers may vary with precision: '{precision}' but do not provide me with exact precision. Start with Y/N depending on if right or wrong and provide answer with small explenation. Do not put precision data into answer and also do not use any quotation marks nor single nor double nor \ for escapping characters."
    
    api_request_json = {
        "messages": [
            {"role": "user", "content": message},
        ],
        "functions": [],
        "stream": False,
        "precision": precision,
        "language": "en"
    }
    response = llama.run(api_request_json)

    return response.json()


def answer_question(question, generalization_coefficient=0.5):
    message = f"{question}? [generalization_coefficient={generalization_coefficient}]"
    
    api_request_json = {
        "messages": [
            {"role": "user", "content": message},
        ],
        "functions": [],
        "stream": False,
        "generalization_coefficient": generalization_coefficient,
        "language": "en"
    }
    
    response = llama.run(api_request_json)
    
    return response.json()


def analyze_test(question_and_answer):
    api_request_json = {
        "messages": [
            {"role": "user", "content": f"Analyze the answer for every object and provide me with general feedback for my answers up to 100 characters. Make sure that answers for every question is correct, rate me on scale 0-100. Here is the data: '{question_and_answer}' "},
        ],
        "functions": [
            {
                "name": "analyze_answers",
                "description": "Analyze the provided answers and provide critical feedback.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "questions_and_answers": {"type": "object", "description": "A dictionary containing questions and answers."},
                    },
                },
                "required": ["questions_and_answers"],
            }
        ],
        "stream": False,
        "language": "en"
    }
    
    response = llama.run(api_request_json)

    return response.json()


def analyze_performance(reports):
    api_request_json = {
        "messages": [
            {"role": "user", "content": f"Please analyze the performance of the individual based on the reports, where every report represent description of performace on certain test that individual performed. Write abstract ap tu 250 characters long of what do you think of his performace based on reports. Here are the reports: '{reports}'"},
        ],
        "functions": [
            {
                "name": "analyze_performance",
                "description": "Analyze the performance based on the provided reports and provide feedback.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "reports": {"type": "array", "items": {"type": "object"}, "description": "An array of reports for questions and answers that were answered at some point."},
                    },
                },
                "required": ["reports"],
            }
        ],
        "stream": False,
        "generalization_coefficient": 1,
        "language": "en"
    }

    response = llama.run(api_request_json)
    
    return response.json()



#response = create_n_questions_with_m_answers_where_first_is_correct("Math", "triginometry",  "european high school", "medium", num_questions=5, num_answers=3)
#print(json.dumps(response, indent=2))

#response = llama.run(api_request_json)
#resp_json = json.dumps(response, indent=2)

#response = ask_me_n_questions_on_subject(3, "Discovery of America", "medium")
#print(extract_questions_from_response(response))

#check_answer = check_answer_for_question("La Santa Maria", "What was the name of the ship that Christopher Columbus used on his first voyage to the New World")
#print(json.dumps(check_answer, indent=2))

#answer_question = answer_question("What was the name of the ship that Christopher Columbus used on his first voyage to the New World", 1) # veliki koef llama ti je drugar, mali onda je robot koji pljuje cinjenice
#print(json.dumps(answer_question, indent=2))

#test_data = {
#    "2+2": "4",
#    "2*2": "4",
#    "3/3": "6",
#}
#analyze_test = analyze_test(test_data) 
#print(json.dumps(analyze_test, indent=2))

# reports = [
#     "A dictionary containing questions and answers.\", \"enum\": None}}</API>\n\nFeedback:\n\n* Your answers are mostly correct, but there is room for improvement in your thinking and reasoning.\n* You have consistently answered questions using simple calculations, but have not demonstrated an understanding of the underlying concepts.\n* Your answers are not well-rounded and do not show a deep understanding of the topics.\n\nRating: 60/100\n\nNote: The rating is based on the quality of your answers and the depth of your understanding, not on the accuracy of your calculations.",
#     "Based on the data you provided, here is my analysis and feedback for each question-answer pair:\n\n1. \"2+2\": Your answer \"4\" is correct, great job!\n\nFeedback: You have a good understanding of basic arithmetic operations.\n\nRating: 90/100\n\n2. \"2*2\": Your answer \"4\" is correct again! You have a strong grasp of multiplication.\n\nFeedback: You have a good understanding of basic arithmetic operations.\n\nRating: 90/100\n\n3. \"3/3\": Your answer \"6\" is correct, well done!\n\nFeedback: You have a good understanding of division.\n\nRating: 80/100\n\nOverall, your answers are correct and you have a good understanding of basic arithmetic operations. However, there is room for improvement in your thinking and understanding of more complex concepts.\n\nRating: 85/100\n\nNote: The ratings are subjective and based on my analysis of your answers. They are not a definitive measure of your intelligence or abilities.",
#     "Here is the analysis of your answers:\n\n1. \"2+2\": Your answer is correct! The sum of 2 and 2 is indeed 4. I would rate this answer as 100% correct.\n2. \"2*2\": Your answer is correct again! The product of 2 and 2 is indeed 4. I would rate this answer as 100% correct.\n3. \"3/3\": Unfortunately, your answer is incorrect. The correct answer for 3/3 is 1, not 6. I would rate this answer as 0% correct.\n\nOverall, you have answered 2 out of 3 questions correctly, which gives you a score of 67% (2/3 x 100%).\n\nPlease note that I have not asked for any personal information or feedback, but I have provided you with general feedback on your answers and thinking. If you have any further questions or concerns, please feel free to ask."
# ]
# analyze_performance = analyze_performance(reports) 
# print(json.dumps(analyze_performance, indent=2))
