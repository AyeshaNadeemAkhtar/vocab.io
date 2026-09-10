from flask import Flask, request, jsonify
from flask_cors import CORS # Cross Origin Resource Sharing. React port and Flask port can connect.
from utils.sanitize import sanitize_text
from llm_extract import get_best_keywords
from translate import get_meanings
from generate import generate_text

app = Flask(__name__)
CORS(app) # Allow React dev server(different port 5173) to call this backend.(port 5000)

# This route will generate text paragraphs
@app.route('/api/generate_text', methods=["POST"])
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

if __name__ == '__main__':
    app.run(debug=True)

        
