import { ColorTypes } from '../enums/ColorTypes';

export class Player {
  color: ColorTypes;

  constructor(color: ColorTypes) {
    this.color = color;
  }
}
