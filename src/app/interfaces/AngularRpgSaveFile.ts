import { PlayerData } from './PlayerData';
import { EnemyData } from './EnemyData';
import { ObstructionData } from './ObstructionData';
import { ItemData } from './ItemData';
import { ExitData } from './ExitData';

export interface AngularRpgSaveFile {
  stage: number;
  width: number;
  height: number;
  player: PlayerData;
  elements: (EnemyData | ObstructionData | ItemData | ExitData)[]; // enemy, obstruction, item, exit
}