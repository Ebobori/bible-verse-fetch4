import React, { useState } from 'react';

const TextFetcher = ({ chunks, handleFetchChunks, handleCopyClick, copiedChunks }) => {
  const [text, setText] = useState('');

  const handleFetch = () => {
    handleFetchChunks(text);
  };

  const handleClear = () => {
    setText(''); // Clear the text input
    handleFetchChunks(''); // Pass an empty string to clear the chunks
  };

  return (
    <div className="text-fetcher">
      <h2>Text Fetcher</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        rows="10"
        cols="50"
      ></textarea>
      <button className="fetch-button" onClick={handleFetch}>Fetch Text Chunks</button>
      <button type="button" className="clear-button" onClick={handleClear}>
          Clear
        </button>

        <div id="output" className="verse-group">
        {chunks.map((chunk, index) => (
          <div key={index} className="verse-chunk-container">
            <div className="verse-chunk">
              <span>{chunk}</span>
              <button
                className={`copy-button ${copiedChunks && copiedChunks.has(chunk) ? 'copied' : ''}`}
                onClick={() => handleCopyClick(chunk)}
              >
                {copiedChunks && copiedChunks.has(chunk) ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextFetcher;
