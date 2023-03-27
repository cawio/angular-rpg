import { Position } from "../interfaces/Position";
import { ElementType } from "../enums/ElementType";
import { Player } from "./Player";

export class Item {
  readonly type = ElementType.Item;
  readonly position: { x: number, y: number };
  constructor(
    readonly name: string,
    readonly description: string,
    readonly icon: string,
    readonly id: string,
    public action: (player: Player, myID: string) => void,
    x: number,
    y: number,
  ) {
    this.position = { x, y };
  }

  getPosition(): Position {
    return this.position;
  }
}
