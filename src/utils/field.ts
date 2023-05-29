import { ALPHABET, BUG_LENGTH } from './constants.ts';
import { random } from './collection.ts';

type BugGenerationArgs = {
  bugsSeed: {
    big?: number;
    medium?: number;
    small?: number;
  };
  possibleCells: ReturnType<typeof generateCells>;
  fieldSize: number;
}

type BugType = 'big' | 'medium' | 'small'

export type Bug = {
  type: BugType;
  shape: string[];
}

function nTimesDo(n: number) {
  return Array.from(Array(n));
}

export function buildHeader(size: number) {
  return nTimesDo(size).map((_, i) => ALPHABET[i]);
}

export function generateCells(size: number) {
  const cells: Record<string, boolean> = {};
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      cells[`${ALPHABET[j]}${i + 1}`] = false;
    }
  }
  return cells;
}

function findPossibleCells(cell: string, size: number) {
  const column = cell[0];
  const row = cell.slice(1);
  const colIndex = ALPHABET.indexOf(column);
  const result: string[] = [];

  // shift left
  if (colIndex > 0) {
    result.push(`${ALPHABET[colIndex - 1]}${row}`);
  }

  // shift right
  if (colIndex < size - 1) {
    result.push(`${ALPHABET[colIndex + 1]}${row}`);
  }

  // shift top
  if (Number(row) > 1) {
    result.push(`${ALPHABET[colIndex]}${Number(row) - 1}`);
  }

  // shift bottom
  if (Number(row) < size) {
    result.push(`${ALPHABET[colIndex]}${Number(row) + 1}`);
  }

  return result;
}

function definePath(start: string, size: number, bounds: string[], shape: string[], fieldSize: number): string[] {
  if (!start || shape.length === size) return shape;

  shape.push(start);
  const possibleCells = findPossibleCells(shape.at(-1)!, fieldSize);
  const availableCells = possibleCells.filter((cell) => !shape.includes(cell) && bounds.includes(cell));
  const next = random(availableCells);

  return definePath(next, size, bounds, shape, fieldSize);
}

export function buildBug(size: number, bounds: string[], fieldSize: number) {
  let shape: string[] = [];
  const blacklisted: string[] = [];

  while (shape.length < size || blacklisted.length === bounds.length) {
    const start = random(bounds.filter((cell) => !blacklisted.includes(cell)));
    shape = definePath(start, size, bounds, shape, fieldSize);
    blacklisted.push(start);
  }

  if (shape.length < size) throw `There is no place to put bug with size ${size}`;

  return shape;
}

export function shapeWithOffset(shape: string[], size: number) {
  const rowChars = nTimesDo(size).map((_, i) => (i + 1).toString());

  const result: string[] = [];

  for (const input of shape) {
    const column = input[0];
    const row = input.slice(1);

    const rowIndex = rowChars.indexOf(row);
    const columnIndex = ALPHABET.indexOf(column);

    // Look up adjacent cells
    for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
      for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
        if (i >= 0 && i < size && j >= 0 && j < size) {
          const adjacentColumn = ALPHABET[j];
          const adjacentRow = rowChars[i];
          if (adjacentColumn !== column || adjacentRow !== row) {
            const adjacentCell = adjacentColumn + adjacentRow;
            if (!result.includes(adjacentCell)) {
              result.push(adjacentCell);
            }
          }
        }
      }
    }
  }

  return result;
}

export function generateBugs({ bugsSeed, possibleCells, fieldSize }: BugGenerationArgs): Bug[] {
  const bugs: Bug[] = [];
  let availableCells = Object.keys(possibleCells);

  Object.entries(bugsSeed).forEach(([type, size]) => {
    nTimesDo(size).forEach(() => {
      const shape = buildBug(BUG_LENGTH[type as BugType], availableCells, fieldSize);
      bugs.push({ type, shape } as Bug);
      availableCells = availableCells.filter((cell) => !shapeWithOffset(shape, fieldSize).includes(cell));
    });
  });

  return bugs;
}
