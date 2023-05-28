import { Bug, buildHeader } from '../utils/field.ts';
import { group } from '../utils/collection.ts';

type Props = {
  size: number;
  cells: string[];
  bugs: Bug[]
  owner?: boolean;
}


export function Field({ size, owner, cells, bugs }: Props) {

  const header = buildHeader(size);
  const groupedCells = group([...cells], size);

  const withinBug = (cell: string) => bugs.some((bug) => bug.shape.includes(cell));

  return (
    <table className="">
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
              <td
                key={cell}
                className="h-8 w-8 bg-emerald-500 text-transparent hover:bg-emerald-700 hover:text-white border cursor-pointer"
              >
                {withinBug(cell) && (
                  <div className="bg-red-600 rounded-full h-full leading-7">{cell}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
