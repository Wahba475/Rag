from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat

app = FastAPI()

# ─── CORS – Allow your Vite frontend to call this backend ───
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",    # default Vite dev port
        "http://localhost:3000",    # if using a different dev port
        "http://localhost:5174",    # if needed
        "*"                       # during development ONLY (remove in production!)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)

@app.get("/")
def root():
    return {"message": "API is running"}