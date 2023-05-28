import { Bug, buildHeader } from '../utils/field';
import { group, random } from '../utils/collection';
import { useEffect, useState } from 'react';
import { FieldCell } from './FieldCell.tsx';

type Props = {
  size: number;
  cells: Record<string, boolean>;
  bugs: Bug[]
  owner?: boolean;
}




export function Field({ size, owner, cells, bugs }: Props) {
  const [revealedCells, setRevealedCells] = useState<string[]>([]);
  const header = buildHeader(size);
  const groupedCells = group(Object.keys(cells), size);

  const withinBug = (cell: string) => bugs.some((bug) => bug.shape.includes(cell));
  const handleComputerAction = (event: CustomEvent) => {
    setRevealedCells([...revealedCells, event.detail]);
  };
  const handleClick = (cell: string) => {
    if (owner || revealedCells.includes(cell)) return;

    setRevealedCells([...revealedCells, cell]);

    // if you've missed, the computer action will be triggered
    if (!withinBug(cell)) {
      const randomCell = random(Object.keys(cells).filter((c) => !revealedCells.includes(c)));
      const event = new CustomEvent('computer-action', { detail: randomCell });
      window.document.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (!owner) return;
    window.document.addEventListener('computer-action', handleComputerAction);

    return () => {
      window.document.removeEventListener('computer-action', handleComputerAction);
    };
  }, [revealedCells]);


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
                onClick={() => handleClick(cell)}
                withBug={withinBug(cell)}
                cell={cell}
                revealed={revealedCells.includes(cell)}
                owner={owner}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
