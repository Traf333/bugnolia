import { GamePickerItem } from './GamePickerItem';
import { GameType } from './Game';

const GAMES = [
  { type: 'quick', description: <p>8x8 size field <br /> with 1 medium and 2 small bugs</p> },
  { type: 'normal', description: <p>10x10 size field <br /> with 1 big and 2 medium bugs</p> },
  { type: 'long', description: <p>16x16 size field <br /> with 2 big, 3 medium and 4 small bugs</p> },
];

type Props = {
  onChange: (type: GameType) => void
}

export function GamePicker({ onChange }: Props) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-medium text-gray-900">
        Pick a game you'd like to play
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        {GAMES.map((game) => (
          <GamePickerItem
            key={game.type}
            type={game.type as GameType}
            description={game.description}
            onChange={onChange}
          />
        ))}
      </ul>
    </div>
  );
}
