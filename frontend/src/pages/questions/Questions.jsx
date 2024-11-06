import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import './Questions.css';

const Questions = () => {
  const [formData, setFormData] = useState({
    occasion: 'Wedding',
    location: '',
    date: '',
    time: '',
    mood: 'Romantic',
    preferred_style: 'Pop',
    names: '',
    language: 'English',
    specific_memories: '',
    special_phrases: '',
    emotions: 'Happiness',
    traditions: '',
    song_length: 'Medium (2-3 minutes)',
    tempo: 'Medium',
    instruments: 'Piano',
    message: ''
  });

  const [lyrics, setLyrics] = useState('');
  const [loading,setLoading]=useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const lyricsEndRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post('http://127.0.0.1:8000/generate-lyrics/', formData);
      setLyrics(response.data.lyrics);
    } catch (error) {
      console.error('Error generating lyrics:', error);
    }
    setLoading(false)
  };

  const handleCopyLyrics = () => {
    // Create a temporary HTML element to strip HTML tags
    const tempElement = document.createElement("div");
    tempElement.innerHTML = lyrics;
    const plainTextLyrics = tempElement.innerText;

    navigator.clipboard.writeText(plainTextLyrics)
      .then(() => {
        setCopySuccess('Lyrics copied to clipboard!');
      })
      .catch(() => {
        setCopySuccess('Failed to copy lyrics.');
      });
  };

  useEffect(() => {
    if (lyrics && lyricsEndRef.current) {
      lyricsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [lyrics]);

  return (
    <div className="questions-container">
      <h1 className="questions-title">Personalized Song Lyrics Generator</h1>
      <form onSubmit={handleSubmit} className="questions-form">
        
        <label className="questions-label">
          Occasion:
          <select name="occasion" value={formData.occasion} onChange={handleChange}>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Graduation">Graduation</option>
            <option value="Family Reunion">Family Reunion</option>
            <option value="Farewell">Farewell</option>
          </select>
        </label>
        
        <label className="questions-label">
          Location:
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </label>
        
        <label className="questions-label">
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label>
        
        <label className="questions-label">
          Time:
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </label>
        
        <label className="questions-label">
          Mood:
          <select name="mood" value={formData.mood} onChange={handleChange}>
            <option value="Romantic">Romantic</option>
            <option value="Joyful">Joyful</option>
            <option value="Sentimental">Sentimental</option>
            <option value="Fun & Lively">Fun & Lively</option>
          </select>
        </label>
        
        <label className="questions-label">
          Preferred Music Style:
          <select name="preferred_style" value={formData.preferred_style} onChange={handleChange}>
            <option value="Pop">Pop</option>
            <option value="Classical">Classical</option>
            <option value="Jazz">Jazz</option>
            <option value="R&B">R&B</option>
            <option value="Rock">Rock</option>
            <option value="Country">Country</option>
          </select>
        </label>
        
        <label className="questions-label">
          Names (comma-separated):
          <input type="text" name="names" value={formData.names} onChange={handleChange} required />
        </label>
        
        <label className="questions-label">
          Language:
          <select name="language" value={formData.language} onChange={handleChange}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Hindi">Hindi</option>
            <option value="French">French</option>
          </select>
        </label>
        
        <label className="questions-label">
          Specific Memories:
          <textarea name="specific_memories" value={formData.specific_memories} onChange={handleChange}></textarea>
        </label>
        
        <label className="questions-label">
          Special Phrases:
          <textarea name="special_phrases" value={formData.special_phrases} onChange={handleChange}></textarea>
        </label>
        
        <label className="questions-label">
          Emotions to Evoke:
          <select name="emotions" value={formData.emotions} onChange={handleChange}>
            <option value="Happiness">Happiness</option>
            <option value="Love">Love</option>
            <option value="Nostalgia">Nostalgia</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </label>
        
        <label className="questions-label">
          Traditions:
          <textarea name="traditions" value={formData.traditions} onChange={handleChange}></textarea>
        </label>
        
        <label className="questions-label">
          Song Length:
          <select name="song_length" value={formData.song_length} onChange={handleChange}>
            <option value="Short (1-2 minutes)">Short (1-2 minutes)</option>
            <option value="Medium (2-3 minutes)">Medium (2-3 minutes)</option>
            <option value="Full-length (3-5 minutes)">Full-length (3-5 minutes)</option>
          </select>
        </label>
        
        <label className="questions-label">
          Tempo:
          <select name="tempo" value={formData.tempo} onChange={handleChange}>
            <option value="Fast">Fast</option>
            <option value="Medium">Medium</option>
            <option value="Slow">Slow</option>
          </select>
        </label>
        
        <label className="questions-label">
          Instruments:
          <select name="instruments" value={formData.instruments} onChange={handleChange}>
            <option value="Piano">Piano</option>
            <option value="Guitar">Guitar</option>
            <option value="Violin">Violin</option>
            <option value="Drums">Drums</option>
          </select>
        </label>
        
        <label className="questions-label">
          Message to Leave:
          <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
        </label>
        
        {loading?  <button type="submit" className="questions-submit-button qusetions-submit-button-loading " disabled>Loading...</button>:
          <button type="submit" className="questions-submit-button">Generate Lyrics</button>
        }
       

      </form>

      {lyrics && (
        <div className="questions-lyrics-container">
          <h2 className="questions-lyrics-title">Lyrics</h2>
          {/* Render HTML lyrics directly */}
          <div 
            className="questions-lyrics" 
            ref={lyricsEndRef}
            dangerouslySetInnerHTML={{ __html: lyrics }}
          />
          <button onClick={handleCopyLyrics} className="copy-button">
            Copy Lyrics
            </button>
          {copySuccess && <p className="copy-success">{copySuccess}</p>}
        </div>
      )}
    </div>
  );
};

export default Questions;
