from flask import Flask, request, jsonify
from flask_cors import CORS # Cross Origin Resource Sharing. React port and Flask port can connect.
from utils.sanitize import sanitize_text
from llm_extract import get_best_keywords
from translate import get_meanings
from generate import generate_text
from generate_mcqs import generate_learn_mcqs
import random

app = Flask(__name__)
CORS(app) # Allow React dev server(different port 5173) to call this backend.(port 5000)

# This route will generate text paragraphs
@app.route('/api/generate-text', methods=["POST"])
def generate_text_endpoint():
    data = request.get_json()
    language = data.get("language", "")

    # We give the data and prompt both so that we can extract the value
    # which is the prompt or input paragraph itself.
    clean_prompt, error = get_clean_field(data, "prompt")

    if error:
        return error
    if not clean_prompt or not language:
        return jsonify({"error": "Prompt and language are required"}), 400

    try:
        generated = generate_text(clean_prompt, language)
    except Exception as e:
        print(f"Generation error: ", e)
        return jsonify({"error": "Text generation failed"}), 500
    
    return jsonify({"text": generated})


# This route will extract and translate keywords.
@app.route('/api/keywords', methods=["POST"])
def extract_keywords_endpoint():
    data = request.get_json() # json objects map to python dicts
    # { "text" : "Ayesha is a good girl"}

    language = data.get("language", "english")
    clean_text, error = get_clean_field(data, "text")

    if error:
        return error
    
    try: 
        #TODO: GEMINI call
        keywords = get_best_keywords(clean_text, language=language)

        # Meanings
        results = get_meanings(keywords, source_lang=language)
    except Exception as e:

        print(f"Keyword Extraction Error: ", e)
        return jsonify({"error": "Keyword Extraction failed"}), 500

    # {"keywords" : [
    #   {"word": "ciao", "meaning": "hello"}
    #]
    # } keywords is going to be key of dictionary. and itself is going
    # to be list of dicts.
    return jsonify({"keywords": results})


def get_clean_field(data: dict, field_name: str, default: str = ""):
    # Returns (clean_value, None) on success, or (None, error_response) on failure

    # if field_name exists otherwise make it empty ""
    # value = data.get("prompt") = "Write a paragraph."
    value = data.get(field_name, default)

    try:
        clean = sanitize_text(value)
        return clean, None
    except ValueError as e:
        return None, (jsonify({"error": str(e)}), 400)


@app.route("/api/learn-session", methods=["POST"])
def learn_session():
    data = request.get_json()
    keywords = data.get("keywords")
    original_text = data.get("original_text")
    language = data.get("language")

    try:
        # [
        #     {
        #     "word": "ciao",
        #     "english_sentence": "Hello! Thanks alot for your help.",
        #     "correct_sentence": "Ciao! Grazie mille per il tuo aiuto",
        #     "wrong_sentences": [
        #         "Buonasera Grazie mille per il tuo aiuto",
        #         "Ciao! Prego mile per il tuo aiuto",
        #         "Scusa mille per avermi ai aiutato"
        #         ]
        #     }
        # ]
        mcqs_data = generate_learn_mcqs(keywords, original_text, language)
        # mcqs_lookup = {
        #     "ciao": {
            #     "word": "ciao",
            #     "english_sentence": "Hello! Thanks alot for your help.",
            #     "correct_sentence": "Ciao! Grazie mille per il tuo aiuto",
            #     "wrong_sentences": [
            #         "Buonasera Grazie mille per il tuo aiuto",
            #         "Ciao! Prego mile per il tuo aiuto",
            #         "Scusa mille per avermi ai aiutato"
            #         ]
            #     }
        # }

        # Converts list of objects to dictionary each entry having it's word
        # as the key and value as an object.

                    # {key: value for m in mcqs_data}
        mcqs_lookup = {m["word"]: m for m in mcqs_data}

    except Exception as e:
        print(f"MCQs generation failed: {e}")

        # if mcqs fail, we still have this dicitonary to look against.
        mcqs_lookup = {}

    questions = []

    # keywords = [
    #     {"id": 1, "word": "Ciao", "translation": "hello"},
    #     {"id": 2, "word": "prego", "translation": "you are welcome"}
    # ]

    for kw in keywords:
        qtype = random.choice(["mcqs", "translation", "pronunciation"])

        if kw["word"] in mcqs_lookup:

             # mcqs_lookup[kw["ciao"]] = more simply the word key in this kw object
            # it will be equal to the whole object
            m = mcqs_lookup[kw["word"]]
            
            # concatenate two lists, additional braces around correct_sentence to make it a list from a plain string 
            options = m["wrong_sentences"] + [m["correct_sentence"]]

            random.shuffle(options)

            questions.append({
                "type": "mcq", 
                "id": kw["id"],
                "prompt": m["english_sentence"],
                "options": options,
                "answer": m["correct_sentence"]

            })
        
        questions.append({
            "type": "translation",
            "id": kw["id"],
            "prompt": kw["translation"], # Prompt is what will be asked to user.
            "answer": kw["word"]
        })
       
        questions.append({
            "type": "pronunciation",
            "id": kw["id"],
            "audioWord": kw["word"],
            "answer": kw["word"]
        })
    
    return jsonify({"questions": questions})




    data = request.get_json()
    user_id = data.get("user_id")
    source_text = data.get("source_text")
    language = data.get("language")
    keywords = data.get("keywords", [])  # [{"word": "...", "meaning": "..."}]

    if not user_id or not source_text or not language:
        return jsonify({"error": "user_id, source_text and language are required"}), 400

    try:
        session_res = supabase_client.table("sessions").insert({
            "user_id": user_id,
            "source_text": source_text,
            "language": language
        }).execute()

        session_id = session_res.data[0]["id"]

        if keywords:
            rows = [
                {"session_id": session_id, "word": k["word"], "meaning": k.get("meaning")}
                for k in keywords
            ]
            supabase_client.table("keywords").insert(rows).execute()

        return jsonify({"session_id": session_id})

    except Exception as e:
        print(f"Save session error: {e}")
        return jsonify({"error": "Could not save session"}), 500


        







if __name__ == '__main__':
    app.run(debug=True)

        
