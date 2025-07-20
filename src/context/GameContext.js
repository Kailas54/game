import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cardType, setCardType] = useState('numbers');
  const [score, setScore] = useState(0);

  return (
    <GameContext.Provider value={{
      theme,
      setTheme,
      soundEnabled,
      setSoundEnabled,
      cardType,
      setCardType,
      score,
      setScore
    }}>
      {children}
    </GameContext.Provider>
  );
};