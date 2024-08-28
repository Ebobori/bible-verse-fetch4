import React, { useState } from 'react';
import TranslationSelect from './TranslationSelect';

const SettingsModal = ({ defaultTranslation, setDefaultTranslation, initialChunkLimit, saveSettings, closeModal }) => {
  const [localChunkLimit, setLocalChunkLimit] = useState(initialChunkLimit);

  const handleChunkLimitChange = (e) => {
    const newLimit = Number(e.target.value);
    if (Number.isInteger(newLimit) && newLimit > 0) {
      setLocalChunkLimit(newLimit);
    }
  };

  const handleSave = () => {
    saveSettings(localChunkLimit);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Settings</h2>
        <TranslationSelect
          defaultTranslation={defaultTranslation}
          setDefaultTranslation={setDefaultTranslation}
        />
        <div>
          <label htmlFor="chunk-limit">Set Chunk Character Limit:</label>
          <input
            id="chunk-limit"
            type="number"
            value={localChunkLimit}
            onChange={handleChunkLimitChange}
            min="1"
            step="1"
          />
        </div>
        <div>
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
