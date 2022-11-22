import { ColorTypes } from '../../enums/ColorTypes';
import { FigureNames } from '../../enums/FigureNames';
import { Cell } from '../Cell';
import { Figure } from './Figure';
import blackLogo from '../../assets/black-king.png';
import whiteLogo from '../../assets/white-king.png';

export class King extends Figure {
  constructor(color: ColorTypes, cell: Cell) {
    super(color, cell);
    this.logo = color === ColorTypes.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    return true;
  }
}
