import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


# ---------------------------
# INSERT DOCUMENT
# ---------------------------
def insert_document(text, embedding):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    embedding_str = str(embedding)
    cursor.execute(
        "INSERT INTO documents (content, embedding) VALUES (%s, %s)",
        (text, embedding_str)
    )

    conn.commit()
    cursor.close()
    conn.close()


# ---------------------------
# SEARCH SIMILAR (FIXED)
# ---------------------------
def search_similar(query_embedding):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    query_str = str(query_embedding)
    cursor.execute(
        """
        SELECT content, embedding <-> %s AS distance
        FROM documents
        ORDER BY distance
        LIMIT 5
        """,
        (query_str,)
    )

    results = cursor.fetchall()

    cursor.close()
    conn.close()

    return results