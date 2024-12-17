from fastapi import APIRouter, HTTPException
from app.models.summarize import SummarizeRequest, SummarizeResponse
from app.services.summarizer import summarize_text
from fastapi.responses import JSONResponse
import logging

router = APIRouter()


@router.post("/", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty")
    try:
        summary = summarize_text(request.text)
        return JSONResponse(content={"summary": summary})
    except Exception as e:
        logging.error("Error in summarization: %s", str(e), exc_info=True)
        raise HTTPException(status_code=500, detail="An internal error occurred. Please try again later.")
