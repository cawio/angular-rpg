import { GameElement } from '../interfaces/GameElement';
import { Position } from '../interfaces/Position';

export class Tile {
  position: Position;
  occupant?: GameElement;

  constructor(x: number, y: number) {
    this.position = { x, y };
  }
}