import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { cardData, sounds } from '../utils/gameData';
import '../styles/MatchingGame.css';
import GameSettings from './GameSettings';
import HowToPlayModal from './HowToPlay';

const MatchingGame = () => {
  const { soundEnabled, theme, cardType, setCardType, score, setScore } = useContext(GameContext);
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [showModal, setShowModal] = useState(true); 

  useEffect(() => {
    initializeGame();
  }, [difficulty, cardType]);

  const initializeGame = () => {
    const currentCards = cardData[cardType] || cardData.numbers;
    const gameCards = [...currentCards, ...currentCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(gameCards);
    setMatched([]);
    setFlipped([]);
    setScore(0);
  };

  // Preload card sounds for smoother playback
  useEffect(() => {
    cards.forEach(card => {
      if (card.sound) {
        const audio = new Audio(card.sound);
        audio.load();
      }
    });
  }, [cards]);

  const playSound = (soundType) => {
    if (soundEnabled && sounds[soundType]) {
      sounds[soundType].currentTime = 0;
      sounds[soundType].play().catch(error => console.log('Sound play error:', error));
    }
  };

  const speakFallback = (text) => {
    if (soundEnabled) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = 'en-US';
      window.speechSynthesis.speak(msg);
    }
  };

  const handleCardClick = (uniqueId) => {
    if (flipped.length === 2 || flipped.includes(uniqueId) || matched.includes(uniqueId)) return;

    const card = cards.find(c => c.uniqueId === uniqueId);

    // Play card-specific audio or use TTS
    if (card?.sound && soundEnabled) {
      const cardAudio = new Audio(card.sound);
      cardAudio.play().catch(err => {
        console.warn("Card audio failed, using TTS fallback:", err);
        speakFallback(card.name);
      });
    } else {
      speakFallback(card?.name);
    }

    playSound('flip');
    setFlipped([...flipped, uniqueId]);

    if (flipped.length === 1) {
      const firstCard = cards.find(card => card.uniqueId === flipped[0]);
      const secondCard = card;

      if (firstCard.id === secondCard.id) {
        playSound('match');
        setMatched([...matched, flipped[0], uniqueId]);
        setScore(prevScore => prevScore + 10);

        // Win condition
        if (matched.length + 2 === cards.length) {
          playSound('win');
        }
      }

      // Reset flip state after short delay
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="game-container" data-theme={theme}>
       {showModal && <HowToPlayModal onClose={() => setShowModal(false)} />}
      <h1>{cardType.charAt(0).toUpperCase() + cardType.slice(1)} Matching Game</h1>
      <GameSettings />
      <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
        <option value="numbers">Numbers</option>
        <option value="emotions">Emotions</option>
        <option value="shapes">Shapes</option>
      </select>
      <div className="score">Score: {score}</div>
      <div className="cards-grid">
        {cards.map(card => (
          <div
            key={card.uniqueId}
            className={`card ${flipped.includes(card.uniqueId) || matched.includes(card.uniqueId) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.uniqueId)}
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingGame;
