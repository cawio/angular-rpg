import { Player } from '../classes/Player';
import { Enemy } from '../classes/Enemy';
import { Item } from '../classes/Item';
import { Exit } from '../classes/Exit';
import { Obstruction } from '../classes/Obstruction';

export type GameElement = Player | Enemy | Item | Exit | Obstruction;