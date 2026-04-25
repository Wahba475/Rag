from fastapi import UploadFile, File
from services.rag import process_pdf
from services.embdings import get_embedding
from services.neonDB import insert_document
from models.QuestionModel import QuestionModel
from services.agent import get_agent


async def upload_pdf(file: UploadFile = File(...)):
    text = await process_pdf(file)
    for chunk in text:
        embedding = get_embedding(chunk)
        insert_document(chunk, embedding)

    return {"message": "PDF processed successfully"}

async def askQuestion(data: QuestionModel):
    question = data.question

    agent = get_agent()   # ✅ move here
    response = agent.invoke({
        "messages": [
            {"role": "user", "content": question}
        ]
    })
    answer = response["messages"][-1].content

    return {
        "question": question,
        "answer": answer
    }