import bleach
import re

MAX_CHARS = 3000
MIN_CHARS = 10

def sanitize_text(raw_text: str) -> str:

    # If text is not given or is not a string
    if not raw_text or not isinstance(raw_text, str):
        raise ValueError("Text is empty or invalid")

    # If text exceeds limit of characters
    if len(raw_text) > MAX_CHARS:
        raise ValueError(f"Text exceeds {MAX_CHARS} character limit")

    # No tags allowed. And remove them with strip.
    clean = bleach.clean(raw_text, tags=[], strip=True)

    """
        \x00-\x1F refers to hex characters 0 - 31 (backspace, tab, shift)
        \x7F refers to code 127 (DEL)
        \u200B - \u200F Zero Width Characters. 
    """

    # Replace the characters in regex with nothing.
    clean = re.sub(r'[\x00-\x1F\x7F\u200B-\u200F]', '', clean)

    if not re.search(r'\b[a-zA-Z]{3,}\b', clean):
        raise ValueError("Please enter actual words, not numbers.")

    # Clean whitespaces
    clean = clean.strip()
    print("Clean:", clean)
   
    if len(clean) < MIN_CHARS:
        raise ValueError("Text too short to extract meaningful keywords")

 
    return clean