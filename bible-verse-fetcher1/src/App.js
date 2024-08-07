import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const versionMap = {
  kjv: 'KJV',
  'king james version': 'KJV',
  niv: 'NIV',
  'new international version': 'NIV',
  nkjv: 'NKJV',
  'new king james version': 'NKJV',
  msg: 'MSG',
  'MESSENGER': 'MSG',
  amp: 'AMP',
  'amplified version': 'AMP',
  esv: 'ESV',
  'english standard version': 'ESV',
  cev: 'CEV',
  'common english version': 'CEV',
};

const localData = {
  KJV: '/data/kjv.json',
  NIV: '/data/niv.json',
  NKJV: '/data/nkjv2.json',
  MSG: '/data/msg.json',
  AMP: '/data/amp.json',
  ESV: '/data/esv.json',
  CEV: '/data/cev.json',
};

const fullNames = {
  kjv: 'King James Version',
  niv: 'New International Version',
  nkjv: 'New King James Version',
  msg: 'The Message',
  amp: 'Amplified Bible',
  esv: 'English Standard Version',
  cev: 'Common English Version',
};

const bookNameMap = {
  Genesis: 0,
  Exodus: 1,
  Leviticus: 2,
  Numbers: 3,
  Deuteronomy: 4,
  Joshua: 5,
  Judges: 6,
  Ruth: 7,
  '1 Samuel': 8,
  '2 Samuel': 9,
  '1 Kings': 10,
  '2 Kings': 11,
  '1 Chronicles': 12,
  '2 Chronicles': 13,
  Ezra: 14,
  Nehemiah: 15,
  Esther: 16,
  Job: 17,
  Psalms: 18,
  Proverbs: 19,
  Ecclesiastes: 20,
  'Song of Songs': 21,
  Isaiah: 22,
  Jeremiah: 23,
  Lamentations: 24,
  Ezekiel: 25,
  Daniel: 26,
  Hosea: 27,
  Joel: 28,
  Amos: 29,
  Obadiah: 30,
  Jonah: 31,
  Micah: 32,
  Nahum: 33,
  Habakkuk: 34,
  Zephaniah: 35,
  Haggai: 36,
  Zechariah: 37,
  Malachi: 38,
  Matthew: 39,
  Mark: 40,
  Luke: 41,
  John: 42,
  Acts: 43,
  Romans: 44,
  '1 Corinthians': 45,
  '2 Corinthians': 46,
  Galatians: 47,
  Ephesians: 48,
  Philippians: 49,
  Colossians: 50,
  '1 Thessalonians': 51,
  '2 Thessalonians': 52,
  '1 Timothy': 53,
  '2 Timothy': 54,
  Titus: 55,
  Philemon: 56,
  Hebrews: 57,
  James: 58,
  '1 Peter': 59,
  '2 Peter': 60,
  '1 John': 61,
  '2 John': 62,
  '3 John': 63,
  Jude: 64,
  Revelation: 65,
};

function App() {
  const [verses, setVerses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedVerses, setCopiedVerses] = useState(new Set());
  const [defaultTranslation, setDefaultTranslation] = useState('NKJV');

  const fetchAndDisplayVerses = async (event) => {
    event.preventDefault();
    setLoading(true);
    setCopiedVerses(new Set());
    const input = document.getElementById('verse-input').value;
    const references = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    setVerses([]);
    setError('');

    for (const reference of references) {
      const [book, chapterAndVerse, versionInput] = parseInput(reference);
      const version = versionInput ? versionMap[versionInput.toLowerCase()] : defaultTranslation;

      if (!book || !chapterAndVerse || !version) {
        setError(prevError => prevError + `Invalid format: ${reference}\n`);
        continue;
      }

      if (!version) {
        setError(prevError => prevError + `Unsupported version: ${versionInput}\n`);
        continue;
      }

      try {
        const url = localData[version];
        const response = await axios.get(url);
        const data = response.data;
        const verses = getVersesFromJson(data, book, chapterAndVerse, version);
        
        if (!verses || verses.length === 0) {
          setError(prevError => prevError + `Verse not found or an error occurred with ${version}.\n`);
          continue;
        }
        
        setVerses(prevVerses => [...prevVerses, { reference, verses }]);
      } catch (err) {
        setError(prevError => prevError + `Error fetching verse: ${reference}\n`);
      }
    }

    setLoading(false);
  };

  const clearInput = () => {
    document.getElementById('verse-input').value = '';
    setVerses([]);
    setCopiedVerses(new Set());
  };

  const parseInput = (input) => {
    const parts = input.match(/^(.+)\s(\d+(?::|\s?vs\s?)\d+-?\d*)\s?(.*)$/i);
    return parts ? [parts[1], parts[2].replace(/vs\s?/i, ':'), parts[3]] : [null, null, null];
  };

  const getVersesFromJson = (data, book, chapterAndVerse, version) => {
    const [chapter, versesRange] = chapterAndVerse.split(':');
    const [startVerse, endVerse] = versesRange.includes('-') ? versesRange.split('-').map(Number) : [Number(versesRange), Number(versesRange)];

    const bookIndex = bookNameMap[book];
    if (bookIndex === undefined) {
      return null;
    }

    const bookData = data.bible.b[bookIndex];
    if (!bookData) {
      return null;
    }

    const chapterData = bookData.c[parseInt(chapter) - 1];
    if (!chapterData) {
      return null;
    }

    const verses = chapterData.v.slice(startVerse - 1, endVerse);
    return verses.map((text, index) => ({
      chapter: parseInt(chapter),
      verse: startVerse + index,
      text,
      book,
      version,
      isFirstVerse: index === 0
    }));
  };

  const splitText = (text, maxLength) => {
    const result = [];
    let start = 0;
    while (start < text.length) {
      let end = start + maxLength;
      if (end < text.length && text[end] !== ' ' && text[end - 1] !== ' ') {
        end = text.lastIndexOf(' ', end);
      }
      result.push(text.substring(start, end).trim());
      start = end + 1;
    }
    return result;
  };

  const handleCopyClick = (chunk) => {
    const textarea = document.createElement('textarea');
    textarea.value = chunk;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopiedVerses(new Set([...copiedVerses, chunk]));
  };

  const createVerseBanner = (verse, index) => {
    const text = verse.isFirstVerse
      ? `${verse.book} ${verse.chapter}:${verse.verse} ${verse.version} ${verse.text}`
      : `${verse.verse} ${verse.text}`;

    const chunks = splitText(text, 200);
    
    return (
      <div key={index} className="verse-chunk-container">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="verse-chunk">
            <span>{chunk}</span>
            <button
              className={`copy-button ${copiedVerses.has(chunk) ? 'copied' : ''}`}
              onClick={() => handleCopyClick(chunk)}
            >
              {copiedVerses.has(chunk) ? 'Copied' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const getVerseChunksCount = () => {
    let totalChunks = 0;
    verses.forEach(verseGroup => {
      verseGroup.verses.forEach(verse => {
        const chunks = splitText(verse.text, 200);
        totalChunks += chunks.length;
      });
    });
    return totalChunks;
  };

  return (
    <div className="App">
      <h1>Bible Verse Fetcher</h1>
      <form onSubmit={fetchAndDisplayVerses}>
        <div className="translation-select">
          <label htmlFor="default-translation">Select a default Bible Translation:</label>
          <select
            id="default-translation"
            value={defaultTranslation}
            onChange={(e) => setDefaultTranslation(e.target.value)}
          >
            {Object.entries(fullNames).map(([key, value]) => (
              <option key={key} value={versionMap[key]}>
                {value}
              </option>
            ))}
          </select>
          <small>This will be used if no Bible translation is specified in the scripture reference (e.g., Hebrews 11:1-2).</small>
        </div>
        <label htmlFor="verse-input">Enter Verse References:</label>
        <textarea id="verse-input" placeholder="e.g., Hebrews 11:1-2 KJV&#10;Hebrews 11 vs 24-27 King James Version" rows="10" cols="50"></textarea>
        <div className="button-group">
          <button type="submit">Fetch Verses</button>
          <button type="button" onClick={clearInput} className="clear-button">Clear</button>
          <div className="verse-count">Number of Banners: {getVerseChunksCount()}</div>
        </div>
      </form>
      {loading && <div className="spinner"></div>}
      {error && <div className="error">{error}</div>}
      <div id="output">
        {verses.map(({ reference, verses: verseChunks }, refIndex) => (
          <div key={refIndex} className="verse-group">
            {verseChunks.map((verse, index) => createVerseBanner(verse, index))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

