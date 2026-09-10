from llm_extract import client
from translate import groq_client

PROVIDER = "gemini"

def generate_text(prompt: str, language: str) -> str:
    full_prompt = (
        f"{prompt}\n\n"
        f"Write your response in {language}. "
        f"Return only the paragraph itself - no title, no preamble, "
        f"no explanation, no quotation marks. "
        f"Keep it between 80 and 150 characters."
    )

    if PROVIDER == "gemini":
        return _generate_gemini(full_prompt)
    elif PROVIDER == "groq":
        return _generate_groq(full_prompt)
    else:
        raise ValueError(f"Unknown Provider: {PROVIDER}")

def _generate_gemini(full_prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=full_prompt,
    )

    return response.text.strip()

def _generate_groq(full_prompt: str) -> str:
    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": full_prompt}],
        max_tokens=400
    )
    return response.choices[0].message.content.strip()
