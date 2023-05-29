type Props = {
  withBug: boolean;
  cell: string;
  revealed: boolean;
  onClick?: (cell: string) => void;
}

export function FieldCell({ onClick, withBug, cell, revealed }: Props) {
  const cellClass = `h-8 w-8 min-w-[2rem] bg-emerald-500 hover:bg-emerald-700 border relative text-transparent hover:text-white ${revealed || !onClick ? 'cursor-default' : 'cursor-zoom-in'}`;
  const cellContentClass = revealed
    ? 'absolute text-green-800 text-5xl leading-[20px] left-[1px] top-[1px]'
    : 'absolute w-full text-center top-0 left-0 text-xl';

  return (
    <td
      className={cellClass}
      onClick={revealed ? undefined : () => onClick?.(cell)}
    >
      {withBug && (!onClick || revealed) && (
        <div className=" bg-red-600 rounded-full h-full leading-7" />
      )}
      <span className={cellContentClass}>
        {revealed ? '×' : cell}
      </span>
    </td>
  );
}
