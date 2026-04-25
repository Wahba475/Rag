import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

def generate_answer(context, question):
    prompt = f"""
You are a helpful assistant.

STRICT RULES:
- ONLY answer using the provided context
- DO NOT use your own knowledge
- If the answer is not in the context, say:
  "I don't have enough information"

Context:
{context}

Question:
{question}
"""

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "mistralai/mistral-7b-instruct:free",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "temperature": 0.2
        }
    )

    return response.json()["choices"][0]["message"]["content"]