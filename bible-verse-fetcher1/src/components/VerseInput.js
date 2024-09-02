import React from 'react';

const VerseInput = ({ fetchAndDisplayVerses, clearInput, getVerseChunksCount }) => {
  return (
    <form onSubmit={fetchAndDisplayVerses}>
      <h2>Enter Verse References:</h2>
      <textarea id="verse-input" placeholder="e.g., Hebrews 11:1-2 KJV&#10;Hebrews 11 vs 24-27 King James Version" rows="10" cols="50"></textarea>
      <div className="button-group">
        <div><button className="fetch-button" type="submit">Fetch Verses</button>
        <button type="button" onClick={clearInput} className="clear-button">Clear</button></div>
        <div className="verse-count">Number of Banners: {getVerseChunksCount()}</div>
      </div>
    </form>
  );
};

export default VerseInput;