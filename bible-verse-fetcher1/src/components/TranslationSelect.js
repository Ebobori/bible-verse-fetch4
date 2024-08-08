import React from 'react';
import { fullNames, versionMap } from '../utils/bibleUtils';

const TranslationSelect = ({ defaultTranslation, setDefaultTranslation }) => {
  return (
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
  );
};

export default TranslationSelect;
