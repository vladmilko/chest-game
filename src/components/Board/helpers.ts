import { Cell } from '../../models/Cell';

export const isSelectedCell = (cell: Cell, selectedCell: Cell | null) =>
  cell.x === selectedCell?.x && cell.y === selectedCell?.y;
