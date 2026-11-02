import re
import json
import ssl
import urllib.request
import urllib.parse
from collections import Counter

STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
    "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
    "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
    "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
    "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
    "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor",
    "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
    "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so",
    "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then",
    "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those",
    "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll",
    "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
    "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd",
    "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"
}

def clean_text_for_ai(raw_text):
    if not raw_text:
        return ""
    # Remove markdown image syntax ![Image](URL)
    cleaned = re.sub(r'!\[.*?\]\(.*?\)', '', raw_text)
    # Remove audio syntax [Audio](URL)
    cleaned = re.sub(r'\[Audio\]\(.*?\)', '', cleaned)
    # Remove PDF attachment syntax [PDF](URL|name)
    cleaned = re.sub(r'\[PDF\]\(.*?\)', '', cleaned)
    # Remove raw URLs
    cleaned = re.sub(r'https?://\S+', '', cleaned)
    # Remove multiple spaces/newlines
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    return cleaned

def score_sentences(text):
    cleaned = clean_text_for_ai(text)
    if not cleaned:
        return ["Visual Note containing embedded photo or media attachment."]
    
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', cleaned) if len(s.strip()) > 3]
    if not sentences:
        return [cleaned] if cleaned.strip() else ["Visual Note containing embedded photo or media attachment."]
    
    words = re.findall(r'\b[a-zA-Z]{3,}\b', cleaned.lower())
    filtered_words = [w for w in words if w not in STOP_WORDS]
    word_freq = Counter(filtered_words)
    
    sentence_scores = []
    for sentence in sentences:
        score = 0
        s_words = re.findall(r'\b[a-zA-Z]{3,}\b', sentence.lower())
        for w in s_words:
            score += word_freq.get(w, 0)
        sentence_scores.append((score, sentence))
    
    sentence_scores.sort(key=lambda x: x[0], reverse=True)
    return [s[1] for s in sentence_scores]

def extract_keywords(text, top_n=5):
    cleaned = clean_text_for_ai(text)
    words = re.findall(r'\b[a-zA-Z]{4,}\b', cleaned.lower())
    filtered = [w.capitalize() for w in words if w not in STOP_WORDS and w.lower() not in ('image', 'static', 'uploads', 'audio', 'document')]
    return [w for w, _ in Counter(filtered).most_common(top_n)]

def generate_gemini_insights(text, api_key):
    models = ["gemini-1.5-pro", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"]
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    cleaned_text = clean_text_for_ai(text)
    if not cleaned_text:
        cleaned_text = "Note with attached image or media document."

    prompt = f"""Provide a concise summary, key points, and tags for this note in JSON format with keys: "summary", "key_points" (list of strings), and "tags" (list of strings).
Note: {cleaned_text[:3000]}"""

    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}]
    }).encode('utf-8')

    for model in models:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key.strip()}"
            req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
            
            with urllib.request.urlopen(req, context=ctx, timeout=12) as response:
                res_data = json.loads(response.read().decode('utf-8'))
                text_resp = res_data['candidates'][0]['content']['parts'][0]['text']
                
                json_match = re.search(r'\{.*\}', text_resp, re.DOTALL)
                if json_match:
                    parsed = json.loads(json_match.group(0))
                else:
                    parsed = {"summary": text_resp[:300], "key_points": [text_resp[:100]], "tags": ["GeminiAI"]}

                words = len(cleaned_text.split())
                reading_time = f"{max(1, round(words / 200))} min read"

                return {
                    "summary": parsed.get('summary', text_resp),
                    "key_points": parsed.get('key_points', []),
                    "tags": parsed.get('tags', []),
                    "reading_time": reading_time,
                    "word_count": words,
                    "engine": f"Google Gemini Pro ({model})"
                }
        except Exception as err:
            print(f"Gemini API attempt with {model} failed: {err}")
            continue

    return None

def generate_note_insights(text, api_key=None):
    cleaned_text = clean_text_for_ai(text or '')
    if not cleaned_text:
        return {
            "summary": "Visual Note containing attached photo/media document.",
            "key_points": ["Note includes embedded image or audio recording."],
            "tags": ["VisualNote", "Media"],
            "reading_time": "< 1 min read",
            "word_count": len((text or '').split()),
            "engine": "Built-in Offline NLP Engine"
        }

    if api_key and api_key.strip():
        gemini_res = generate_gemini_insights(text, api_key.strip())
        if gemini_res:
            return gemini_res

    ranked_sentences = score_sentences(cleaned_text)
    summary_sentences = ranked_sentences[:3] if len(ranked_sentences) >= 3 else ranked_sentences
    summary = " ".join(summary_sentences) if summary_sentences else "Visual Note containing attached photo/media document."
    
    key_points = ranked_sentences[:5] if ranked_sentences else ["Note includes embedded image or audio recording."]
    tags = extract_keywords(cleaned_text)
    if not tags:
        tags = ["VisualNote", "Notes"]
    
    words = len(cleaned_text.split())
    reading_time = f"{max(1, round(words / 200))} min read"
    
    return {
        "summary": summary,
        "key_points": key_points,
        "tags": tags,
        "reading_time": reading_time,
        "word_count": words,
        "engine": "Built-in Offline NLP Engine"
    }
