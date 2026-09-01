from flask import Flask, request, jsonify
from flask_cors import CORS # Cross Origin Resource Sharing. React port and Flask port can connect.
from utils.sanitize import sanitize_text
from llm_extract import get_best_keywords
from translate import get_meanings

app = Flask(__name__)
CORS(app) # Allow React dev server(different port 5173) to call this backend.(port 5000)

@app.route('/api/keywords', methods=["POST"])
def extract_keywords_endpoint():
    data = request.get_json() # json objects map to python dicts
    # { "text" : "Ayesha is a good girl"}

    raw_text = data.get("text") if data else None
    language = data.get("language", "english")

    try:
        clean_text = sanitize_text(raw_text)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400 # Tuple => {"error": "Text is invalid"}, status_code

    #TODO: GEMINI call
    keywords = get_best_keywords(clean_text, language=language)

    # Meanings
    results = get_meanings(keywords, source_lang=language)

    # {"keywords" : ["nuove", "piacere", "buonaserra"]}
    return jsonify({"keywords": results})

if __name__ == '__main__':
    app.run(debug=True)

        
