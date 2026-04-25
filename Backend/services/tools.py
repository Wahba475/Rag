from langchain_core.tools import tool
from services.embdings import get_embedding
from services.neonDB import search_similar


@tool
def search_documents(query: str) -> str:
    """
    Search uploaded documents for relevant information.
    Use this tool to answer questions about the uploaded PDFs.
    """

    # 1. Embed query
    query_embedding = get_embedding(query)

    # 2. Search DB
    results = search_similar(query_embedding)

    # 3. Take top chunks
    chunks = [r[0] for r in results[:5]]

    # 4. Return as context
    return "\n\n".join(chunks)