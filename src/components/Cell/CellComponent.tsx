import classNames from 'classnames';
import React, { FC } from 'react';
import { Cell } from '../../models/Cell';

interface CellProps {
  cell: Cell;
  selected: boolean;
  onClick: (cell: Cell) => void;
}

export const CellComponent: FC<CellProps> = ({ cell, selected, onClick }) => (
  <div
    className={classNames('cell', cell.color, {
      selected: selected,
      availableFigure: cell.available && cell.figure,
    })}
    onClick={() => onClick(cell)}
  >
    {cell.available && !cell.figure && <div className="available" />}
    {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
  </div>
);
