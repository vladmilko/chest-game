import logo from '../../assets/black-bishop.png';
import { ColorTypes } from '../../enums/ColorTypes';
import { FigureNames } from '../../enums/FigureNames';
import { Cell } from '../Cell';

export class Figure {
  color: ColorTypes;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  constructor(color: ColorTypes, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (
      target.figure?.color === this.color ||
      target.figure?.name === FigureNames.KING
    ) {
      return false;
    }

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveFigure(target: Cell) {
    return;
  }
}
