import { ElementType } from "../enums/ElementType";
import { Position } from "../interfaces/Position";

export class Exit {
  readonly type = ElementType.Exit;
  readonly icon = '🕳️';
  readonly exp: number;

  constructor (
    goToStage: number,
    readonly x: number,
    readonly y: number,
  ) {
    this.exp = this.initExp(goToStage);
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  initExp(stage: number): number {
    return stage * 10;
  }
}
