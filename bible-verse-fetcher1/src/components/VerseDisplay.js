import React from 'react';
import { splitText } from '../utils/bibleUtils';

const VerseDisplay = ({ verses, handleCopyClick }) => {
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
              className={`copy-button ${verse.copied ? 'copied' : ''}`}
              onClick={() => handleCopyClick(chunk)}
            >
              {verse.copied ? 'Copied' : 'Copy'}
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
