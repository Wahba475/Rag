from PyPDF2 import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter

async def process_pdf(file):
    reader = PdfReader(file.file)

    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", ".", " "],
        chunk_size=500,
        chunk_overlap=50,
        length_function=len,
      
    )
    chunks=text_splitter.split_text(text)
    
   
    return chunks

