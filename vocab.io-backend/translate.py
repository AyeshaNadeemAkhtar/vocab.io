import argostranslate.translate
import json
from groq import Groq
from llm_extract import client
from dotenv import load_dotenv

# load the groq api key to os environment variable
load_dotenv()

LANG_CODE_MAP = {
    "italian": "it",
    "spanish": "es",
    "finnish": "fi",
    "english": "en",
}

groq_client = Groq() # read Groq api key from .env

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

def get_argos_translations(keywords: list, src_code: str) -> dict:
    # (keywords list, "it")

    installed_languages = argostranslate.translate.get_installed_languages()

    # Find if the package for source language is installed
    src_lang = next((l for l in installed_languages if l.code == src_code), None)

    # Target Language will always be english
    tgt_lang = next((l for l in installed_languages if l.code =="en"), None)

    if not src_lang or not tgt_lang:
        return {kw: "(language pack not installed)" for kw in keywords}

    # just get the whole translation model as an object
    translation = src_lang.get_translation(tgt_lang)

    results = {}
    for kw in keywords:
        try:
            # resuses the translation object to call translate method
            results[kw] = translation.translate(kw)
        except Exception as e:
            print(f"Argos Translation failed for '{kw}': {e}")
            results[kw] = "(translation unavailable)"
    return results


def refine_with_groq(original_text: str, keywords: list, src_lang: str) -> dict:
    prompt = f"""You are helping a language learner studying {src_lang}.

    Original Text: {original_text}

    For each word below, give its correct meaning IN CONTEXT of this text
    (use the base/dictionary form, e.g. infinitive for verbs).
    Return ONLY plain English words or short phrases as definitions.
    Do not include emojis, symbols, or non-English characters.

    Words: {keywords}

    Return ONLY a JSON object mapping each word to its corrected meaning.
    Example: {{"word1": "meaning1", "word2": "meaning2"}}"""

    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}]
    )

    # take only the first choice as the answer
    raw = response.choices[0].message.content.strip()

    print(f"GROQ RAW RESPONSE: {repr(raw)}") #bp

    if raw.startswith("```"):
        raw = raw.strip("`").replace("json", "", 1).strip()
    return json.loads(raw)



def get_meanings(keywords: list, source_lang: str = "english", original_text: str = ""):

    # get always get the value based on key get("italian") => "it"
    src_code = LANG_CODE_MAP.get(source_lang.lower())

    if not src_code:
        # [ LIST COMPREHENSION 
        # {"word": "excusez", "meaning": "Unsupported Language"},
        # {"word": "hej", "meaning": "Unsupported Language"}
        #]
        return [{"word": kw, "meaning": "(Unsupported Language)"} for kw in keywords]

    if src_code == "en":
        try:
            definitions = get_simple_definitions_for_english(keywords)
        except Exception as e:
            print(f"Definition lookup failed: {e}")
            definitions = {}

        return [
            # Make list of dicts, look through definitions and get the value of 
            # keyword, if can't fall back to "definition unavailable."
            {"word": kw, "meaning": definitions.get(kw, "(definition unavailable)")}
            for kw in keywords
        ]


    try:
        # Get refined meanings from groq 
        refined = refine_with_groq(original_text, keywords, source_lang)

    except Exception as e:
        print(f"Groq refinement failed, using Argos fallback: {e}")
        refined = {}

    # For each keyword, check if it is in refined
    missing = [kw for kw in keywords if kw not in refined]
    if missing:
        # Get the meanings for missing keywords in refined
        argos_meanings = get_argos_translations(missing, src_code)
        for kw in missing:
            # Now make that keyword key in refined and get its meaning from argostranslate
            refined[kw] = argos_meanings.get(kw, "(meaning unavailable)")

    return [{"word": kw, "meaning": refined[kw]} for kw in keywords]







