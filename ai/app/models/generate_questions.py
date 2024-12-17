from pydantic import BaseModel, Field
from typing import List

class QuestionRequest(BaseModel):
    text: str = Field(..., min_length=1, description="The text to generate questions from")
    number: int = Field(3, ge=1, le=10, description="Number of questions to generate")

class QuestionResponse(BaseModel):
    questions: List[str] = Field(..., description="List of generated questions")