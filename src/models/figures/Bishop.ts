import { Cell } from '../Cell';
import { Figure } from './Figure';
import { ColorTypes } from '../../enums/ColorTypes';
import { FigureNames } from '../../enums/FigureNames';
import blackLogo from '../../assets/black-bishop.png';
import whiteLogo from '../../assets/white-bishop.png';

export class Bishop extends Figure {
  constructor(color: ColorTypes, cell: Cell) {
    super(color, cell);
    this.logo = color === ColorTypes.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (this.cell.isEmptyDiagonal(target)) return true;

    return false;
  }
}
