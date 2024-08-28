import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
// import TranslationSelect from '.components/TranslationSelect';
import VerseInput from './components/VerseInput';
import VerseDisplay from './components/VerseDisplay';
import SettingsModal from './components/SettingsModal'; // Import the new SettingsModal component
import { versionMap, localData, bookNameMap, bookNameVariations, parseInput, getVersesFromJson, splitText } from './utils/bibleUtils';

function App() {
  const [verses, setVerses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedVerses, setCopiedVerses] = useState(new Set());
  const [defaultTranslation, setDefaultTranslation] = useState('NKJV');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State to control modal visibility

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen); // Toggle the modal visibility
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

  const getVerseChunksCount = () => {
    let totalButtons = 0;
    verses.forEach(verseGroup => {
      verseGroup.verses.forEach(verse => {
        const chunks = splitText(verse.text, 200);
        totalButtons += chunks.length;
      });
    });
    return totalButtons;
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Bible Verse Fetcher</h1>
        <button onClick={toggleSettingsModal}>Settings</button> {/* Settings Button */}
      </div>
      {/* Render the SettingsModal if isSettingsOpen is true */}
      {isSettingsOpen && (
        <SettingsModal 
          defaultTranslation={defaultTranslation}
          setDefaultTranslation={setDefaultTranslation}
          closeModal={toggleSettingsModal}
        />
      )}
      <VerseInput
        fetchAndDisplayVerses={fetchAndDisplayVerses}
        clearInput={clearInput}
        getVerseChunksCount={getVerseChunksCount}
      />
      {loading && <div className="spinner"></div>}
      {error && <div className="error">{error}</div>}
      <VerseDisplay verses={verses} handleCopyClick={handleCopyClick} copiedVerses={copiedVerses} />
    </div>
  );
}

export default App;
