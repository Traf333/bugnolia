type Props = {
  onClick: () => void;
  withBug: boolean;
  cell: string;
  revealed: boolean;
  owner?: boolean;
}

export function FieldCell({ onClick, withBug, cell, revealed, owner }: Props) {
  const cellClass = `h-8 w-8 bg-emerald-500 hover:bg-emerald-700 border relative text-transparent hover:text-white ${revealed || owner ? 'cursor-default' : 'cursor-zoom-in'}`
  const cellContentClass = revealed
    ? 'absolute text-green-800 text-5xl leading-[20px] left-[1px] top-[1px]'
    : 'absolute w-full text-center top-0 left-0 text-xl';

  return (
    <td
      className={cellClass}
      onClick={onClick}
    >
      {withBug && (owner || revealed) && (
        <div className="bg-red-600 rounded-full h-full leading-7">{cell}</div>
      )}
      <span className={cellContentClass}>
        {revealed ? '×' : cell}
      </span>
    </td>
  );
}
