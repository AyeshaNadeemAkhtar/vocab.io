import os
import json
from google import genai
from dotenv import load_dotenv
from extract import yake_extract_keywords

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

def get_best_keywords(text: str, language: str="english", max_keywords=15):

    yake_candidates = yake_extract_keywords(text, language=language, max_keywords=30)

    prompt = f"""You are helping a language learner studying {language}

    Below is a piece of text, and a list of candidate keywords that a
    statistical algorithm (YAKE) found in it. YAKE tends to favour frequent
    or early-appearing words and can miss rare-but-important vocabulary.

    Your job: Read the actual text yourself, and return the {max_keywords}
    most useful vocabulary words for a learner to study. You may reuse best
    words from YAKE's list, drop weak/filler ones it included, and add
    meaningful words YAKE missed. Favour genuinely useful vocabulary over
    frequency. 

    Text: {text}

    YAKE's candidates: {yake_candidates}

    Return ONLY a JSON array of strings. nothing else. Example: ["word1", "word2"]"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    print("Response: ", response)

    raw = response.text
    keywords = json.loads(raw)

    print("Raw: ", raw)
    print("Keywords: ", keywords)

    return keywords