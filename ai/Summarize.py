import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest
import PyPDF2

# Function to summarize text
def summarize_text(text, num_sentences=3):  # Default is 3 sentences
    # Load the spaCy model
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    
    # Tokenize and filter out stop words, punctuation, and newline characters
    tokens = [token.text.lower() for token in doc 
              if token.text.lower() not in STOP_WORDS and 
              token.text not in punctuation and 
              token.text != '\n']
    
    # Calculate word frequencies
    word_frequencies = Counter(tokens)
    max_frequency = max(word_frequencies.values())
    
    # Normalize word frequencies
    for word in word_frequencies:
        word_frequencies[word] = word_frequencies[word] / max_frequency
    
    # Score sentences based on word frequencies
    sentence_scores = {}
    for sentence in doc.sents:
        for word in sentence:
            if word.text.lower() in word_frequencies:
                if sentence not in sentence_scores:
                    sentence_scores[sentence] = word_frequencies[word.text.lower()]
                else:
                    sentence_scores[sentence] += word_frequencies[word.text.lower()]
    
    # Get the top n sentences
    summary_sentences = nlargest(num_sentences, sentence_scores, key=sentence_scores.get)
    
    # Join sentences to form the summary
    summary = ' '.join([str(sentence) for sentence in summary_sentences])
    
    return summary

# Function to extract text from a PDF file
def extract_text_from_pdf(file_path):
    text = ""
    try:
        with open(file_path, 'rb') as pdf_file:
            reader = PyPDF2.PdfReader(pdf_file)
            for page_num in range(len(reader.pages)):
                text += reader.pages[page_num].extract_text()
    except Exception as e:
        print(f"Error reading PDF file: {e}")
    return text

# Example usage
if __name__ == "__main__":
    # Ask user for file path
    file_path = input("Please enter the path to the text or PDF file (e.g., book.txt or book.pdf): ")
    
    text = ""
    
    # Determine file type and extract text accordingly
    if file_path.endswith('.txt'):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                text = file.read()
        except FileNotFoundError:
            print(f"Error: The file '{file_path}' was not found.")
        except Exception as e:
            print(f"An error occurred: {e}")
    elif file_path.endswith('.pdf'):
        text = extract_text_from_pdf(file_path)
    
    if text:
        # Summarize the extracted text
        summary = summarize_text(text)
        
        # Print the summary
        print("\nSummary:")
        print(summary)
    else:
        print("Could not extract text from the file.")
