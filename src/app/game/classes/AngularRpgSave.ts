import { AngularRpg } from './AngularRpg';
import { Player } from './Player';
import { Enemy } from './Enemy';
import { Item } from './Item';
import { Exit } from './Exit';
import { Obstruction } from './Obstruction';
import { Position } from '../interfaces/Position';
import { ElementType } from '../enums/ElementType';
import { EnemyType } from '../enums/EnemyType';
import { GameElement } from '../interfaces/GameElement';

export class AngularRpgSave {
  player: Player;
  currentStage: number;
  elements: GameElement[] = [];

  constructor(angularRpg: AngularRpg) {
    this.player = angularRpg.player;
    this.currentStage = angularRpg.currentStage;
    this.elements = angularRpg.elements.filter(element => element.type !== ElementType.Player);
  }

  /**
   * Method to transform the AngularRpg object into a JSON string
   * that can be saved to a file and downloaded.
   */
  transformToJSON(): string {
    const save = {
      stage: this.currentStage,
      player: {
        name: this.player.name,
        level: this.player.level,
        exp: this.player.exp,
        maxHealth: this.player.maxHealth,
        currentHealth: this.player.currentHealth,
        attributes: this.player.attributes,
        inventory: [...this.player.inventory.map(item => {
          return {
            id: item.id,
            name: item.name,
            icon: item.icon,
            description: item.description,
            type: item.type,
          };
        })],
        position: this.player.getPosition()
      },
      elements: [
        ...this.elements.map(element => {
          switch (element.type) {
            case ElementType.Enemy:
              return {
                id: element.id,
                type: element.type,
                enemyType: (element as Enemy).enemyType,
                position: element.getPosition()
              };
            case ElementType.Item:
              return {
                id: element.id,
                name: (element as Item).name,
                icon: (element as Item).icon,
                type: element.type,
                description: (element as Item).description,
                position: element.getPosition()
              };
            case ElementType.Exit:
              return {
                type: element.type,
                position: element.getPosition(),
              };
            case ElementType.Obstruction:
              return {
                type: element.type,
                position: element.getPosition(),
              };
            default:
              return {};
          }
        })
      ],
    };

    return JSON.stringify(save);
  }
}