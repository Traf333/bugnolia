import { useEffect, useMemo, useReducer } from 'react';
import { Bug, generateBugs, generateCells, shapeWithOffset } from '../utils/field';
import { Field } from './Field';
import { random } from '../utils/collection.ts';

const gameTypes = {
  quick: {
    fieldSize: 8,
    big: 0,
    medium: 1,
    small: 2,
  },
  normal: {
    fieldSize: 10,
    big: 1,
    medium: 2,
    small: 0,
  },
  long: {
    fieldSize: 16,
    big: 2,
    medium: 4,
    small: 5,
  },
} as const;

export type GameType = keyof typeof gameTypes

type Props = {
  gameType: GameType;
  onEnd: () => void;
}

enum ActionKind {
  HIT = 'HIT',
  DISCOVER = 'DISCOVER',
}

type HitPayload = string;
type DiscoverPayload = string[]
type Action = {
  type: ActionKind;
  payload: HitPayload | DiscoverPayload;
}

type State = string[]

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.HIT: {
      return [...state, action.payload as HitPayload];
    }
    case ActionKind.DISCOVER: {
      return [...state, ...action.payload as DiscoverPayload];
    }
    default:
      return state;
  }
}

export function Game({ gameType, onEnd }: Props) {
  const [userActions, dispatchByUser] = useReducer(reducer, []);
  const [computerActions, dispatchByComputer] = useReducer(reducer, []);

  const {
    fieldSize, cells, userBugs, computerBugs,
  } = useMemo(() => {
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
    return { fieldSize, cells, userBugs: bugs, computerBugs: partnersBugs };
  }, []);

  const randomAvailableCell = (collection: string[], revealedCells: string[]) => (
    random(collection.filter((c) => !revealedCells.includes(c)))
  );

  const hitUserBug = (cell: string) => userBugs.some((bug) => bug.shape.includes(cell));
  const hitComputerBug = (cell: string) => computerBugs.some((bug) => bug.shape.includes(cell));
  const bugDiscovered = (bug: Bug, revealedCells: string[]) => bug.shape.every((cell) => revealedCells.includes(cell));
  const handleCellClick = (cell: string) => {
    dispatchByUser({ type: ActionKind.HIT, payload: cell });
    // if user hit we check if the bug was discovered to cleanup space around,
    // otherwise action goes to computer side
    if (hitComputerBug(cell)) {
      const bug = computerBugs.find((bug) => bug.shape.includes(cell));
      if (bug && bugDiscovered(bug, [...userActions, cell])) {
        dispatchByUser({ type: ActionKind.DISCOVER, payload: shapeWithOffset(bug.shape, fieldSize) });
      }
    } else {
      let randomCell: string;
      do {
        randomCell = randomAvailableCell(cells, computerActions);
        dispatchByComputer({ type: ActionKind.HIT, payload: randomCell });
        const bug = userBugs.find((bug) => bug.shape.includes(randomCell));
        if (bug && bugDiscovered(bug, [...computerActions, randomCell])) {
          dispatchByComputer({ type: ActionKind.DISCOVER, payload: shapeWithOffset(bug.shape, fieldSize) });
        }
      } while (hitUserBug(randomCell));
    }
  };

  useEffect(() => {
    let winner;
    if (userBugs.every((bug) => bugDiscovered(bug, computerActions))) {
      winner = 'Computer';
    } else if (computerBugs.every((bug) => bugDiscovered(bug, userActions))) {
      winner = 'User';
    }

    if (winner) {
      const res = confirm(`${winner} found bugs faster. \n Do you want to try one more game?`);
      if (res) onEnd();
    }
  }, [computerActions, userActions]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between gap-10 mt-12">
        <div className="overflow-x-auto max-w-[90vw] md:overflow-hidden md:max-w-max">
          <Field
            size={fieldSize}
            cells={cells}
            bugs={userBugs}
            revealedCells={computerActions}
          />
          <h3>Your Field</h3>
        </div>
        <div className="overflow-x-auto max-w-[90vw] md:overflow-hidden md:max-w-max">
          <Field
            size={fieldSize}
            cells={cells}
            bugs={computerBugs}
            revealedCells={userActions}
            onCellClick={handleCellClick}
          />
          <h3>Colleague's Field <br /> <small>(beta version: computer only)</small></h3>
        </div>
      </div>
    </div>
  );
}
