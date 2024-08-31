import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import VerseInput from './components/VerseInput';
import VerseDisplay from './components/VerseDisplay';
import SettingsModal from './components/SettingsModal';
import TextFetcher from './components/TextFetcher';
import { versionMap, localData, bookNameMap, bookNameVariations, parseInput, getVersesFromJson, splitText } from './utils/bibleUtils';

function App() {
  const [verses, setVerses] = useState([]);
  const [chunks, setChunks] = useState([]); // State for text fetcher chunks
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedVerses, setCopiedVerses] = useState(new Set());
  const [copiedChunks, setCopiedChunks] = useState(new Set()); // State for copied text fetcher chunks
  const [defaultTranslation, setDefaultTranslation] = useState('NKJV');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chunkLimit, setChunkLimit] = useState(200);
  const [activeTab, setActiveTab] = useState('bible'); // State to manage active tab

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const saveSettings = (newChunkLimit) => {
    setChunkLimit(newChunkLimit);
  };

  const fetchAndDisplayVerses = async (event) => {
    event.preventDefault();
    setLoading(true);
    setCopiedVerses(new Set());
    const input = document.getElementById('verse-input').value;
    const references = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let allVerses = [];
    setError('');

    for (const reference of references) {
      const [book, chapterAndVerse, versionInput] = parseInput(reference);
      const version = versionInput ? versionMap[versionInput.toLowerCase()] : defaultTranslation;

      if (!book || !chapterAndVerse || !version) {
        setError(prevError => prevError + `Invalid format: ${reference}\n`);
        continue;
      }

      const normalizedBook = bookNameVariations[book] || book;

      if (!bookNameMap.hasOwnProperty(normalizedBook)) {
        setError(prevError => prevError + `Invalid book name: ${book}\n`);
        continue;
      }

      try {
        const url = localData[version];
        const response = await axios.get(url);
        const data = response.data;
        const verses = getVersesFromJson(data, normalizedBook, chapterAndVerse, version, bookNameMap);

        if (!verses || verses.length === 0) {
          setError(prevError => prevError + `Verse not found or an error occurred with ${version}.\n`);
          continue;
        }

        allVerses = [...allVerses, { reference, verses }];
      } catch (err) {
        setError(prevError => prevError + `Error fetching verse: ${reference}\n`);
      }
    }

    setVerses(allVerses);
    setLoading(false);
  };

  const clearInput = () => {
    document.getElementById('verse-input').value = '';
    setVerses([]);
    setCopiedVerses(new Set());
  };

  const handleCopyClick = (chunk) => {
    const textarea = document.createElement('textarea');
    textarea.value = chunk;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setCopiedVerses(prevCopied => {
      const newCopied = new Set(prevCopied);
      newCopied.add(chunk);
      return newCopied;
    });
  };

  const handleCopyChunkClick = (chunk) => {
    const textarea = document.createElement('textarea');
    textarea.value = chunk;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setCopiedChunks(prevCopied => {
      const newCopied = new Set(prevCopied);
      newCopied.add(chunk);
      return newCopied;
    });
  };

  const handleFetchChunks = (inputText) => {
    const chunkedText = splitText(inputText, chunkLimit);
    setChunks(chunkedText);
  };

  const getVerseChunksCount = () => {
    let totalButtons = 0;
    verses.forEach(verseGroup => {
      verseGroup.verses.forEach(verse => {
        const chunks = splitText(verse.text, chunkLimit);
        totalButtons += chunks.length;
      });
    });
    return totalButtons;
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Bible Verse & Text Fetcher</h1>
        <button onClick={toggleSettingsModal}>Settings</button>
      </div>
      {isSettingsOpen && (
        <SettingsModal 
          defaultTranslation={defaultTranslation}
          setDefaultTranslation={setDefaultTranslation}
          initialChunkLimit={chunkLimit}
          saveSettings={saveSettings}
          closeModal={toggleSettingsModal}
        />
      )}
      <div className="tabs">
        <button
          className={activeTab === 'bible' ? 'active' : ''}
          onClick={() => setActiveTab('bible')}
        >
          Bible Fetcher
        </button>
        <button
          className={activeTab === 'text' ? 'active' : ''}
          onClick={() => setActiveTab('text')}
        >
          Text Fetcher
        </button>
      </div>

      {activeTab === 'bible' && (
        <div>
          <VerseInput
            fetchAndDisplayVerses={fetchAndDisplayVerses}
            clearInput={clearInput}
            getVerseChunksCount={getVerseChunksCount}
          />
          {loading && <div className="spinner"></div>}
          {error && <div className="error">{error}</div>}
          <VerseDisplay
            verses={verses}
            handleCopyClick={handleCopyClick}
            copiedVerses={copiedVerses}
            chunkLimit={chunkLimit}
          />
        </div>
      )}

      {activeTab === 'text' && (
        <div>
          <TextFetcher
            chunks={chunks}
            handleFetchChunks={handleFetchChunks}
            handleCopyClick={handleCopyChunkClick}
            copiedChunks={copiedChunks}
          />
        </div>
      )}
    </div>
  );
}

export default App;
