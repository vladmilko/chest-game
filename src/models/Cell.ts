import { ColorTypes } from '../enums/ColorTypes';
import { Board } from './Board';
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: ColorTypes;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: ColorTypes,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty() {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    return (
      Boolean(target.figure) && target.figure?.color !== this.figure?.color
    );
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) return false;

    const min = Math.min(this.y, target.y) + 1;
    const max = Math.max(this.y, target.y);

    for (let y = min; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }

    return true;
  }
  isEmptyHorizontal = (target: Cell): boolean => {
    if (this.y !== target.y) return false;

    const min = Math.min(this.y, target.y) + 1;
    const max = Math.max(this.y, target.y);

    for (let x = min; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }

    return true;
  };
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }

  moveFigure(target: Cell) {
    if (this.figure?.canMove(target)) {
      this.figure.moveFigure(target);

      if (target.figure) {
        this.board.addLostFigure(target.figure);
      }

      target.setFigure(this.figure);
      this.figure = null;
    }
  }
}
