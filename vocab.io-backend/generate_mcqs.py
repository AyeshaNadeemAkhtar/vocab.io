from translate import groq_client
import json

def generate_learn_mcqs(keywords, original_text, language):
    # Building a list of words from list of dict of keywords and their meanings 
    word_list = [k["word"] for k in keywords]

    # json.dumps convert an py5hon object into JSON formatted string 
    # and json.loads() converts JSON text into python object
    # {{ "word"}} we use two braces here so that it's interpreted as literal {word}
    # instead of the value of word.
    prompt = prompt = f"""Context ({language}): "{original_text}"

    For each word, write:
    1. A short natural {language} sentence using it correctly.
    2. Its English translation.
    3. 3 incorrect {language} sentences — similar length/topic/grammar, but clearly 
    wrong once translated. Vary subject/verb/object, not just one word. If a word can't support 3 good 
    near-misses, use simple unrelated {language} sentences instead.

    Words: {json.dumps(word_list)}

    Return ONLY JSON array, same order:
    [{{"word":"...","english_sentence":"...","correct_sentence":"...","wrong_sentences":["...","...","..."]}}]"""

    
    
    response = groq_client.chat.completions.create(
    model="openai/gpt-oss-20b",
    messages=[{"role": "user", "content": prompt}],
    max_completion_tokens=4096,   # NEW — enough room for reasoning + full JSON output
    reasoning_effort="low",       # NEW — tells the model to spend fewer tokens "thinking",
                                   # leaving more of the budget for the actual JSON answer
)

    # This is what response object looks like.
    # response {
    #     "choices": [
    #         {
    #             "message": {
    #                 "content": "[{\"word\", \"gatto\"}"
    #             }
    #         }
    #     ]
    # }

    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.strip("`").replace("json", "", 1).strip()
    return json.loads(raw)