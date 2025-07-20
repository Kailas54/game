import React from 'react';
import '../styles/HowToPlay.css'; // We'll style it next

const HowToPlayModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>How to Play 🧠</h2>
        <ul>
          <li>🎯 Flip two cards at a time.</li>
          <li>✅ Match the cards with same content to score points.</li>
          <li>🔁 If they don't match, they'll flip back.</li>
          <li>🏁 Match all cards to win the game.</li>
        </ul>
        <button className="modal-close-btn" onClick={onClose}>Start Game</button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
