from fastapi import APIRouter
from controllers.chatController import upload_pdf, askQuestion

router = APIRouter(prefix="/chat")

router.post("/upload")(upload_pdf)
router.post("/ask")(askQuestion)
