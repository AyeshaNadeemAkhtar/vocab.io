import argotranslate.translate

LANG_CODE_MAP = {
    "italian": "it",
    "spanish": "es",
    "finnish": "fi",
    "english": "en",
}

def get_meanings(keywords: list, source_lang: str = "english"):

    # get always get the value based on key get("italian") => "it"
    src_code = LANG_CODE_MAP.get(source_lang.lower())