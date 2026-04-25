import os
from dotenv import load_dotenv
from services.tools import search_documents

load_dotenv()

def get_agent():
    from langchain_openai import ChatOpenAI
    from langchain.agents import create_agent

    models = [
        "openai/gpt-oss-120b",
        "meta-llama/llama-3-8b-instruct",
        "google/gemma-7b-it",
    ]

    for model_name in models:
        try:
            print(f"Trying model: {model_name}")

            llm = ChatOpenAI(
                openai_api_base="https://openrouter.ai/api/v1",
                openai_api_key=os.getenv("OPENROUTER_API_KEY"),
                model=model_name,
                temperature=0.0
            )

            tools = [search_documents]

            agent = create_agent(
                model=llm,
                tools=tools,
                system_prompt=(
                    "You are a retrieval-based assistant.\n\n"

                    "STRICT RULES:\n"
                    "1. You MUST call the search_documents tool for EVERY question.\n"
                    "2. You are NOT allowed to answer without calling the tool.\n"
                    "3. Do NOT use prior knowledge.\n"
                    "4. Your final answer MUST be based ONLY on the tool output.\n"
                    "5. If the tool returns empty or irrelevant results, respond EXACTLY:\n"
                    "   'I don't have enough information.'\n\n"

                    "You are evaluated on STRICT compliance.\n"
                    "If you skip the tool, your answer is WRONG."
                )
                
            )

            return agent

        except Exception as e:
            print(f"Model failed: {model_name} → {e}")
            continue

    raise Exception("All models failed")