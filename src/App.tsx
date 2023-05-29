import { useState } from 'react';
import { GamePicker } from './components/GamePicker';
import { Game, type GameType } from './components/Game';

import './App.css';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameType | undefined>();

  const reset = () => {
    setStartGame(false);
    setSelectedGame(undefined);
  };

  if (!startGame) return (
    <div>
      <h1 className="mb-8">Bugnolia</h1>
      <h3 className="mb-8">Welcome to the place where you can help your colleague to find a bug</h3>
      <div>
        <GamePicker onChange={(type: GameType) => setSelectedGame(type)} />
        {selectedGame && (
          <button onClick={() => setStartGame(true)} className="mt-12">
            Start {selectedGame} game
          </button>
        )}
      </div>
      <figure className="max-w-md m-auto">
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
    <div className="md:p-8">
      <h1 className="mb-8">Bugnolia</h1>
      <h3>Let's help a colleague to find a bug</h3>
      <Game gameType={selectedGame!} onEnd={reset} />
      <button onClick={reset} className="mt-12">Go Back</button>
    </div>
  );
}

export default App;
