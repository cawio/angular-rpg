import { Attributes } from './Attributes';
import { ItemData } from './ItemData';
import { Position } from './Position';

export interface PlayerData {
  name: string;
  level: number;
  exp: number;
  maxHealth: number;
  currentHealth: number;
  attributes: Attributes;
  inventory: ItemData[];
  position: Position;
}
