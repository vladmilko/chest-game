import { ColorTypes } from '../../enums/ColorTypes';
import { FigureNames } from '../../enums/FigureNames';
import { Cell } from '../Cell';
import { Figure } from './Figure';
import blackLogo from '../../assets/black-queen.png';
import whiteLogo from '../../assets/white-queen.png';

export class Queen extends Figure {
  constructor(color: ColorTypes, cell: Cell) {
    super(color, cell);
    this.logo = color === ColorTypes.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    if (
      this.cell.isEmptyVertical(target) ||
      this.cell.isEmptyHorizontal(target) ||
      this.cell.isEmptyDiagonal(target)
    )
      return true;

    return false;
  }
}
