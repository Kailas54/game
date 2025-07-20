import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/GameSettings.css';

const GameSettings = () => {
  const { theme, setTheme, soundEnabled, setSoundEnabled } = useContext(GameContext);

  return (
    <div className="game-settings">
      <div className="setting-item">
        <label>Theme:</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="pastel">Pastel</option>
        </select>
      </div>
      <div className="setting-item">
        <label>Sound:</label>
        <input
          type="checkbox"
          checked={soundEnabled}
          onChange={(e) => setSoundEnabled(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default GameSettings;