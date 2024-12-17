import spacy
import random


def generate_questions(text, number=5):
    """
    Generate more realistic and diverse questions from a given text.
    
    Parameters:
        text (str): Input text to generate questions from.
        number (int): Number of questions to generate.
    
    Returns:
        List[str]: A list of generated questions.
    """
    
    # Load spaCy's English model

    nlp = spacy.load("en_core_web_sm")

    doc = nlp(text)
    questions = []
    
    # Loop through each sentence in the text
    for sent in doc.sents:
        sent_text = sent.text
        root_verb = None
        
        # Extract root verb of the sentence
        for token in sent:
            if token.dep_ == "ROOT" and token.pos_ == "VERB":
                root_verb = token
                break

        # Generate questions based on Named Entities
        for ent in sent.ents:
            if ent.label_ == "PERSON":
                questions.append(f"Who is {ent.text}?")
            elif ent.label_ in ["ORG"]:
                questions.append(f"What does {ent.text} do?")
            elif ent.label_ in ["GPE", "LOC"]:
                questions.append(f"Where is {ent.text}?")
            elif ent.label_ == "DATE":
                questions.append(f"When did {sent_text}?")
            elif ent.label_ == "EVENT":
                questions.append(f"What happened during {ent.text}?")
        
        # Generate questions based on sentence structure
        for token in sent:
            if token.dep_ == "nsubj" and root_verb:
                questions.append(f"Who {root_verb.lemma_} {token.head.text}?")
            if token.dep_ == "dobj" and root_verb:
                questions.append(f"What did {token.head.text} {token.text}?")
            
            # Handling more complex structures such as indirect objects or prepositions
            if token.dep_ == "iobj" and root_verb:
                questions.append(f"To whom did {root_verb.lemma_} {token.head.text}?")
            if token.dep_ == "prep" and token.head.dep_ == "pobj" and root_verb:
                questions.append(f"Where did {root_verb.lemma_} {token.head.text} {token.head.head.text}?")
        
        # Passive voice handling - Transforming active to passive questions
        if root_verb and root_verb.dep_ != "aux":
            questions.append(f"What was done by {sent_text}?")
        
    # Remove duplicates and shuffle
    unique_questions = list(set(questions))
    random.shuffle(unique_questions)
    
    # Return the desired number of questions
    return unique_questions[:number]