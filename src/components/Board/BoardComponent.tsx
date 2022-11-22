import React, { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { Board } from '../../models/Board';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import CellComponent from '../Cell';
import { isSelectedCell } from './helpers';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  playerCurrent: Player | null;
  swapPlayer: () => void;
}

export const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  playerCurrent,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  const onClick = (cell: Cell) => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === playerCurrent?.color) {
        setSelectedCell(cell);
      }
    }
  };

  const updateBoard = useCallback(() => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }, [board]);

  const highLightCells = () => {
    board.highLightCells(selectedCell);
    updateBoard();
  };

  useEffect(() => {
    highLightCells();
  }, [selectedCell]);

  return (
    <div>
      <h3>Текущий игрок {playerCurrent?.color}</h3>
      <div className="board">
        {board.cells.map((row, ind) => (
          <Fragment key={ind}>
            {row.map((cell) => (
              <CellComponent
                key={cell.id}
                cell={cell}
                selected={isSelectedCell(cell, selectedCell)}
                onClick={onClick}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
