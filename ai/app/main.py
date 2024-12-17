from fastapi import FastAPI
from app.routes import summarize, questions

app = FastAPI(
    title="NLP Processing API",
    description="API for text summarization and question generation using spaCy",
    version="1.0.0"
)

app.include_router(summarize.router, prefix="/summarize", tags=["Summarization"])
app.include_router(questions.router, prefix="/questions", tags=["Question Generation"])