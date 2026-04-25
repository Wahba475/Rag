import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

# configure API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_embedding(text):
    response = genai.embed_content(
        model="models/gemini-embedding-001",
        content=text,
        output_dimensionality=768
    )

    return response["embedding"]