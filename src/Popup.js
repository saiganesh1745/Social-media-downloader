// Popup.js
import React from 'react';
import './Popup.css'; // Import the Popup styles

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Important Message</h2>
        <p>small elephat ? want to make it big.</p>
        <button onClick={onClose} className="popup-close-button">Close</button>
      </div>
    </div>
  );
};

export default Popup;