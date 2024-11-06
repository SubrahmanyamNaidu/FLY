import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain import LLMChain, OpenAI
from langchain.prompts import PromptTemplate

from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS Middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SongRequest(BaseModel):
    occasion: str
    location: str
    date: str
    time: str
    mood: str
    preferred_style: str
    names: str
    language: str
    specific_memories: str
    special_phrases: str
    emotions: str
    traditions: str
    song_length: str
    tempo: str
    instruments: str
    message: str

# Initialize OpenAI API with LangChain
openai_api_key = os.getenv("OPENAI_API_KEY")

# Define a template to guide the song generation
template = """
Generate a song for a special occasion based on the following information:

- Occasion: {occasion}
- Location: {location}
- Date: {date}
- Time: {time}
- Mood: {mood}
- Preferred Music Style: {preferred_style}
- Key People: {names}
- Language: {language}
- Specific Memories: {specific_memories}
- Special Phrases: {special_phrases}
- Emotions to Evoke: {emotions}
- Traditions: {traditions}
- Song Length: {song_length}
- Tempo: {tempo}
- Instruments: {instruments}
- Message: {message}

Compose the song with appropriate verses, a chorus, and a bridge, if applicable. Aim to make the lyrics heartfelt and fitting for the occasion.
- Wrap each verse with <p class="verse">...</p>.
- Wrap each chorus with <p class="chorus">...</p> and indicate that it’s a chorus.
- Wrap any bridge sections with <p class="bridge">...</p>.
"""

# Create the prompt and chain
prompt_template = PromptTemplate(template=template, input_variables=list(SongRequest.__fields__.keys()))
llm = OpenAI(api_key=openai_api_key)
song_chain = LLMChain(prompt=prompt_template, llm=llm)

@app.post("/generate-lyrics/")
async def generate_lyrics(request: SongRequest):
    # Generate song lyrics using LangChain
    song_data = request.dict()
    song_lyrics = song_chain.run(song_data)
    print(song_lyrics)
    return {"lyrics": song_lyrics}
