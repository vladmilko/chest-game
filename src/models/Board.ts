import { ColorTypes } from '../enums/ColorTypes';
import { Cell } from './Cell';
import { Bishop } from './figures/Bishop';
import { Figure } from './figures/Figure';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, ColorTypes.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, ColorTypes.WHITE, null));
        }
      }

      this.cells.push(row);
    }
  }

  // Считаем на какие ячейки фигура может походить
  public highLightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = Boolean(selectedCell?.figure?.canMove(target));
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();

    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;

    return newBoard;
  }

  public addFigures() {
    this.addBishops();
    this.addKings();
    this.addPawns();
    this.addQueens();
    this.addRooks();
    this.addKnights();
  }

  addLostFigure(figure: Figure) {
    figure.color === ColorTypes.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure);
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(ColorTypes.BLACK, this.getCell(i, 1));
      new Pawn(ColorTypes.WHITE, this.getCell(i, 6));
    }
  }
  private addQueens() {
    new Queen(ColorTypes.BLACK, this.getCell(3, 0));
    new Queen(ColorTypes.WHITE, this.getCell(3, 7));
  }
  private addBishops() {
    new Bishop(ColorTypes.BLACK, this.getCell(2, 0));
    new Bishop(ColorTypes.BLACK, this.getCell(5, 0));
    new Bishop(ColorTypes.WHITE, this.getCell(2, 7));
    new Bishop(ColorTypes.WHITE, this.getCell(5, 7));
  }
  private addKings() {
    new King(ColorTypes.BLACK, this.getCell(4, 0));
    new King(ColorTypes.WHITE, this.getCell(4, 7));
  }
  private addKnights() {
    new Knight(ColorTypes.BLACK, this.getCell(1, 0));
    new Knight(ColorTypes.BLACK, this.getCell(6, 0));
    new Knight(ColorTypes.WHITE, this.getCell(1, 7));
    new Knight(ColorTypes.WHITE, this.getCell(6, 7));
  }
  private addRooks() {
    new Rook(ColorTypes.BLACK, this.getCell(0, 0));
    new Rook(ColorTypes.BLACK, this.getCell(7, 0));
    new Rook(ColorTypes.WHITE, this.getCell(0, 7));
    new Rook(ColorTypes.WHITE, this.getCell(7, 7));
  }
}
