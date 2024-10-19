# AI

## Install Dependencies
```python
# Install necessary libraries
!pip install transformers

```

## Summarize Text
```python
from transformers import pipeline

def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(text, max_length=150, min_length=40, do_sample=False)
    return summary[0]['summary_text']
```

## Questions Generation
```python
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Load the T5 model and tokenizer for question generation
model = T5ForConditionalGeneration.from_pretrained('valhalla/t5-base-qg-hl')
tokenizer = T5Tokenizer.from_pretrained('valhalla/t5-base-qg-hl')

def generate_question(text, answer):
    # Insert <hl> tags around the answer in the text
    highlighted_text = text.replace(answer, f"<hl>{answer}</hl>")
    input_text = f"generate question: {highlighted_text}"
    
    # Tokenize and generate question
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    outputs = model.generate(input_ids)
    
    # Decode the generated question
    question = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return question
```