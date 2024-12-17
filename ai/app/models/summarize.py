from pydantic import BaseModel, Field

class SummarizeRequest(BaseModel):
    text: str = Field(..., min_length=1, description="The text to be summarized")

class SummarizeResponse(BaseModel):
    summary: str = Field(..., description="The generated summary")