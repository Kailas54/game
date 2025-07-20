import React from 'react';
import MatchingGame from './components/MatchingGame';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <MatchingGame />
      </div>
    </GameProvider>
  );
}

export default App;
