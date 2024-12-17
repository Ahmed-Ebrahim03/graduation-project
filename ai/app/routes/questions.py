from fastapi import APIRouter, HTTPException
from app.models.generate_questions import QuestionRequest, QuestionResponse
from app.services.question_gen import generate_questions

router = APIRouter()

@router.post("/", response_model=QuestionResponse)
async def create_questions(request: QuestionRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty")
    try:
        questions = generate_questions(request.text, request.number)
        return QuestionResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))