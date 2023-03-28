import { Player } from "../classes/Player";
import { GameElement } from "./GameElement";

export interface AngularRpgLoadData {
  stage: number;
  width: number;
  height: number;
  player: Player;
  elements: GameElement[];
}