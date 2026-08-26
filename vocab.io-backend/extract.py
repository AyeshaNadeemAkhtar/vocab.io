import yake

LANG_CODES = {
    "english": "en",
    "italian": "it",
    "spanish": "es",
    "finnish": "fi",
}

def yake_extract_keywords(text: str, language: str = "english", max_keywords: int = 30):
   
   # Convert the language in lowercase and get it's value from LANG_CODES dictionary
    lang_code = LANG_CODES.get(language.lower(), "en")

    # Creates a yake object
    kw_extractor = yake.KeywordExtractor(
        lan=lang_code,# Language "it" or "en"
        n=1, # Extract single words. n=2 extract short phrases
        dedupLim=0.9, # How similar keywords can be before dropping one
        top=max_keywords,# No of keywords 
    )

    # YAKE built in extract keywords function 
    keywords = kw_extractor.extract_keywords(text)

    # ("parco", 0.09) => A tuple of YAKE keywords and pair[1] refers to core
    keywords.sort(key=lambda pair : pair[1])

    result = []
    for kw, score in keywords:
        result.append(kw)

    return result

