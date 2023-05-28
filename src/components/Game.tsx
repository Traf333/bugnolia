import { generateBugs, generateCells } from '../utils/field.ts';
import { Field } from './Field.tsx';

const gameTypes = {
  quick: {
    fieldSize: 8,
    big: 0,
    medium: 1,
    small: 2,
  },
  medium: {
    fieldSize: 10,
    big: 1,
    medium: 2,
    small: 0,
  },
  long: {
    fieldSize: 16,
    big: 2,
    medium: 3,
    small: 4,
  },
} as const;

export type GameType = keyof typeof gameTypes

type Props = {
  gameType: GameType
}

export function Game({ gameType }: Props) {
  const { big, medium, small, fieldSize } = gameTypes[gameType];
  const cells = generateCells(fieldSize);

  const bugs = generateBugs({
    bugsSeed: { big, medium, small },
    possibleCells: cells,
    fieldSize,
  });

  const partnersBugs = generateBugs({
    bugsSeed: { big, medium, small },
    possibleCells: cells,
    fieldSize,
  });

  return (
    <div>
      <div className="flex justify-between gap-10 mt-12">
        <div>
          <Field size={fieldSize} owner cells={cells} bugs={bugs} />
          <h3>Your Field</h3>
        </div>
        <div>
          <Field size={fieldSize} cells={cells} bugs={partnersBugs} />
          <h3>Colleague's Field <br /> <small>(beta version: computer only)</small></h3>
        </div>
      </div>
    </div>
  );
}
