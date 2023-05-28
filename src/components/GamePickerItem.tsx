import { GameType } from './Game.tsx';

type Props = {
  type: GameType;
  description: string;
  onChange: (type: GameType) => void;
}

export function GamePickerItem({ type, description, onChange }: Props) {
  return (
    <li>
      <input
        type="radio"
        id={type}
        name="gameType"
        value={type}
        onChange={() => onChange(type)}
        className="hidden peer"
        required
      />
      <label
        htmlFor={type}
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
      >
        <div className="block">
          <div className="w-full text-lg font-semibold uppercase">{type}</div>
          <div className="w-full">{description}</div>
        </div>
      </label>
    </li>
  );
}
