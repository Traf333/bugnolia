import { useState } from 'react';
import { GamePicker } from './components/GamePicker.tsx';
import { Game, GameType } from './components/Game.tsx';

import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameType | undefined>();

  if (!startGame) return (
    <div>
      <h1 className="mb-8">Bugnolia</h1>
      <h3 className="mb-8">Welcome to the place where you can help your colleague to find a bug</h3>
      <div>
        <GamePicker onChange={(type) => setSelectedGame(type)} />
        {selectedGame && <button onClick={() => setStartGame(true)}>Start {selectedGame} game</button>}
      </div>
      <figure className="max-w-lg">
        <img src="/magnolia.jpg" alt="Magnolia" />
        <figcaption>
          <a href="https://worldofgardenplants.com/what-bugs-eat-magnolia-trees/" target="_blank">
            Even magnolia have bugs
          </a>
        </figcaption>
      </figure>
    </div>
  );
  return (
    <div>
      <h1 className="mb-8">Bugnolia</h1>
      <h3>Let's help a colleague to find a bug</h3>
      <Game gameType={selectedGame!} />
    </div>
  );
}

export default App;
