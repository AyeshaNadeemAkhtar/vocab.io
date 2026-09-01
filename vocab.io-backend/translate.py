import argostranslate.translate
import json
from llm_extract import client

LANG_CODE_MAP = {
    "italian": "it",
    "spanish": "es",
    "finnish": "fi",
    "english": "en",
}

def get_simple_definitions_for_english(words: list) -> dict:
    prompt = f"""Give a simple, one-sentence definition for each of these english words
    for a language learner. If a word is archaic/old English, mention that.
    Words: {words}
    Return ONLY a JSON object mapping each word to its definition.
    Example: {{"word1": "definition1", "word2": "definition2"}}"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    # response.text = 
    # " ```json\n
    # ["gatto, "correre"]\n
    # ```  "
    raw = response.text.strip() # remove spaces from start and end of whole response.text

    if raw.startswith("```"):

        # Chew off backtick characters from both sides, 
        # replace the first occurence of "json" with nothing
        # with strip() remove the newlines 
        raw = raw.strip("`").replace("json", "", 1).strip() # ["gatto", "correra"] => text
    
    # load json string to python list object
    return json.loads(raw)





def get_meanings(keywords: list, source_lang: str = "english"):

    # get always get the value based on key get("italian") => "it"
    src_code = LANG_CODE_MAP.get(source_lang.lower())

    if not src_code:
        # [ LIST COMPREHENSION 
        # {"word": "excusez", "meaning": "Unsupported Language"},
        # {"word": "hej", "meaning": "Unsupported Language"}
        #]
        return [{"word": kw, "meaning": "(Unsupported Language)"} for kw in keywords]

    results = []
    for kw in keywords:
        try:
            if src_code == "en":
                meaning = get_simple_definitions_for_english(keywords)
            else:
                meaning = argotranslate.translate.translate(kw, src_code, "en")
        except Exception:
            meaning = "(translation unavailable)"
        results.append({"word": kw, "meaning": meaning})

    return results