from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from collections import Counter
from heapq import nlargest
import spacy

# Function to summarize text
def summarize_text(text, num_sentences=3, chunk_size=1000):  
    """Summarizes large texts by splitting into chunks."""
    # Load the spaCy model
    nlp = spacy.load("en_core_web_sm")
    
    # Split the text into manageable chunks
    chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]
    summaries = []
    
    for chunk in chunks:
        doc = nlp(chunk)
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
        summaries.append(' '.join([str(sentence) for sentence in summary_sentences]))
    
    # Combine summaries from all chunks
    final_summary = ' '.join(summaries)
    return final_summary