import { ElementType } from '../enums/ElementType';
import { Position } from '../interfaces/Position';

export class Obstruction {
  readonly icon = '🌳';
  readonly type = ElementType.Obstruction;
  constructor(
    private x: number,
    private y: number
  ) { }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }
}
