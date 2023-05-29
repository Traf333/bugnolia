import { Bug, buildHeader } from '../utils/field';
import { group } from '../utils/collection';
import { FieldCell } from './FieldCell';

type Props = {
  size: number;
  cells: string[];
  bugs: Bug[];
  revealedCells: string[];
  onCellClick?: (cell: string) => void;
}

export function Field({ size, cells, bugs, revealedCells, onCellClick }: Props) {
  const header = buildHeader(size);
  const groupedCells = group(cells, size);

  const withinBug = (cell: string) => bugs.some((bug) => bug.shape.includes(cell));

  return (
    <table className="select-none">
      <thead>
        <tr>
          <td />
          {header.map((col) => <td key={col}>{col}</td>)}
        </tr>
      </thead>
      <tbody>
        {groupedCells.map((row, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            {row.map((cell) => (
              <FieldCell
                key={cell}
                onClick={onCellClick}
                withBug={withinBug(cell)}
                cell={cell}
                revealed={revealedCells.includes(cell)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
