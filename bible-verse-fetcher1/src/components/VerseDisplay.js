import React from 'react';
import { splitText } from '../utils/bibleUtils';

const VerseDisplay = ({ verses, handleCopyClick, chunkLimit, copiedVerses }) => {
  const createVerseBanner = (verse, index) => {
    const text = verse.isFirstVerse
      ? `${verse.book} ${verse.chapter}:${verse.verse} ${verse.version} ${verse.text}`
      : `${verse.verse} ${verse.text}`;

    const chunks = splitText(text, chunkLimit);

    return (
      <div key={index} className="verse-chunk-container">
        {chunks.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="verse-chunk">
            <span>{chunk}</span>
            <button
              className={`copy-button ${copiedVerses && copiedVerses.has(chunk) ? 'copied' : ''}`}
              onClick={() => handleCopyClick(chunk)}
            >
              {copiedVerses && copiedVerses.has(chunk) ? 'Copied' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="output">
      {verses.map(({ reference, verses: verseChunks }, refIndex) => (
        <div key={refIndex} className="verse-group">
          {verseChunks.map((verse, index) => createVerseBanner(verse, index))}
        </div>
      ))}
    </div>
  );
};

export default VerseDisplay;
