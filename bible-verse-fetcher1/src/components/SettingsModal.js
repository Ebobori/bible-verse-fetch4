import React from 'react';
import TranslationSelect from './TranslationSelect';

const SettingsModal = ({ defaultTranslation, setDefaultTranslation, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Settings</h2>
        <TranslationSelect
          defaultTranslation={defaultTranslation}
          setDefaultTranslation={setDefaultTranslation}
        />
        <button onClick={closeModal}>Close</button> {/* Close Button */}
      </div>
    </div>
  );
};

export default SettingsModal;
