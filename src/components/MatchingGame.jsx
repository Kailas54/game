import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { cardData, sounds } from '../utils/gameData';
import '../styles/MatchingGame.css';
import GameSettings from './GameSettings';

const MatchingGame = () => {
  const { soundEnabled, theme, cardType, setCardType, score, setScore } = useContext(GameContext);
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  // Remove this line as cardType is already coming from context
  // const [cardType, setCardType] = useState('numbers');

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

  const playSound = (soundType) => {
    if (soundEnabled && sounds[soundType]) {
      sounds[soundType].currentTime = 0;
      sounds[soundType].play().catch(error => console.log('Sound play error:', error));
    }
  };

  const handleCardClick = (uniqueId) => {
    if (flipped.length === 2) return;
    if (flipped.includes(uniqueId)) return;
    if (matched.includes(uniqueId)) return;

    playSound('flip');
    setFlipped([...flipped, uniqueId]);

    if (flipped.length === 1) {
      const firstCard = cards.find(card => card.uniqueId === flipped[0]);
      const secondCard = cards.find(card => card.uniqueId === uniqueId);

      if (firstCard.id === secondCard.id) {
        playSound('match');
        setMatched([...matched, flipped[0], uniqueId]);
        setScore(prevScore => prevScore + 10);
        
        // Check if game is complete
        if (matched.length + 2 === cards.length) {
          playSound('win');
        }
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="game-container" data-theme={theme}>
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