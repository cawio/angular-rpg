import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Item } from "./Item";
import { Exit } from "./Exit";
import { Obstruction } from "./Obstruction";
import { GameElement } from "../interfaces/GameElement";
import { Position } from "../interfaces/Position";
import { Inputs } from "../enums/Inputs";
import { ElementType } from "../enums/ElementType";
import { EnemyType } from "../enums/EnemyType";
import { ItemActionType } from "../enums/ItemActionType";
import { ItemConfigData } from "../interfaces/ItemConfigData";

export class AngularRpg {
  readonly width: number;
  readonly height: number;
  player: Player;
  opponent?: Enemy;
  item?: Item;
  currentStage = 0;
  elements: GameElement[] = [];

  constructor(player: string | Player, height: number, width: number, private itemConfigData: ItemConfigData[], elements?: GameElement[], stage?: number) {
    this.width = width;
    this.height = height;

    // init player object
    const playerPos = this.genRandomPos();
    if (typeof player === 'string') {
      this.player = new Player(player, this.width, this.height, playerPos.x, playerPos.y);
    } else {
      this.player = player;
    }

    // generate Game Elements
    if (elements) {
      this.elements = elements;
    } else {
      this.genElements();
    }

    if (stage) {
      this.currentStage = stage;
    }
  }

  operateGame(direction: Inputs): GameElement[] {
    // handle the players move
    this.elements = this.player.move(direction, this.elements, ElementType.Player);
    // check if the player and any other element are on the same tile
    const elementOnTile = this.isCurrentTileOccupied();
    if (elementOnTile) {
      // if so, handle the interaction
      this.handleInteraction(elementOnTile);
    }

    // move each enemy
    this.elements.forEach(element => {
      if (element.type === ElementType.Enemy) {
        const enemy = element as Enemy;
        enemy.randomMove(this.elements);
      }
    });

    return this.elements;
  }

  clearElements(): void {
    this.elements = [];
  }

  addElements(elements: GameElement[]): void {
    this.elements.push(...elements);
  }

  genElements(): void {
    // Clear game elements
    this.clearElements();
    // Add player
    this.addElements([this.player]);
    // Generate obstructions
    for (let i = 0; i < 3; i++) {
      this.addElements(this.genObstrCluster(this.elements.map(element => element.getPosition()) as Position[]));
    }
    // add exit
    const exitPos = this.genRandomPos(this.elements.map(element => element.getPosition()) as Position[]);
    const exit = new Exit(this.currentStage + 1, exitPos.x, exitPos.y);
    this.addElements([exit]);
    // generate enemies
    const enemies = this.genEnemies(this.currentStage + 1);
    this.addElements(enemies);

    // generate one item for now
    const itemPos = this.genRandomPos(this.elements.map(element => element.getPosition()) as Position[]);
    const itemID = 'i' + Date.now().toString();
    const configData = this.itemConfigData.filter(itemConfig => itemConfig.actionType === ItemActionType.Heal)[0];
    const item = new Item(
      itemID,
      ItemActionType.Heal,
      configData,
      (player: Player, myID: string) => {
        player.heal(5);
        player.inventory = player.inventory.filter(item => item.id !== myID);
      },
      itemPos.x, itemPos.y,
    );
    this.addElements([item]);
  }

  genEnemies(amount: number): Enemy[] {
    const enemies: Enemy[] = [];
    const blockedPositions: Position[] = this.elements.map(element => element?.getPosition()) as Position[];
    for (let i = 0; i < amount; i++) {
      const position = this.genRandomPos(blockedPositions);
      blockedPositions.push(position);
      const typeToGen: number = Math.floor(Math.random() * (Object.keys(EnemyType).length / 2));
      const enemy = new Enemy('enemy' + i, typeToGen, this.currentStage, this.width, this.height, position.x, position.y);
      enemies.push(enemy);
    }

    return enemies;
  }

  genRandomPos(blockedPositions?: Position[]): Position {
    const randomX = Math.floor(Math.random() * this.width);
    const randomY = Math.floor(Math.random() * this.height);
    const position: Position = { x: randomX, y: randomY };
    if (blockedPositions) {
      const positionIsBlocked = blockedPositions.some(blockedPosition => blockedPosition.x === position.x && blockedPosition.y === position.y)
      if (positionIsBlocked) {
        return this.genRandomPos(blockedPositions);
      }
    }

    return position;
  }

  genObstrCluster(blockedPositions?: Position[]): Obstruction[] {
    // look for cluster of free spaces
    const freeSpaces: Position[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const possiblePosition: Position = { x, y };
        const positionBlocked = blockedPositions?.some(position => {
          return position.x === possiblePosition.x && position.y === possiblePosition.y;
        });
        if (positionBlocked) {
          continue;
        }
        freeSpaces.push(possiblePosition);
      }
    }

    // handle case where there are no free spaces
    const noFreeSpaces = freeSpaces.length === 0;
    if (noFreeSpaces) {
      return [];
    }

    // pick a random free space
    const randomFreeSpace = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
    const cluster = [new Obstruction(randomFreeSpace.x, randomFreeSpace.y)];
    const offsetArray = [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
    for (let i = 0; i < 3; i++) {
      const offset = offsetArray[Math.floor(Math.random() * offsetArray.length)];
      const newX = randomFreeSpace.x + offset[0];
      const newY = randomFreeSpace.y + offset[1];
      const newPosition: Position = { x: newX, y: newY };
      if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height &&
          !blockedPositions?.some(position => position.x === newPosition.x && position.y === newPosition.y)) {
        cluster.push(new Obstruction(newPosition.x, newPosition.y));
      }
    }

    return cluster;
  }

  isCurrentTileOccupied(): GameElement | undefined {
    const element = this.elements.find(element => {
      if (this.playerTypeGuard(element)) {
        return false;
      }
      const elementPos = element.getPosition();
      const playerPos = this.player.getPosition();
      return elementPos.x === playerPos.x && elementPos.y === playerPos.y;
    });

    return element;
  }

  playerTypeGuard (element: GameElement): element is Player {
    return element.type === ElementType.Player;
  }

  enemyTypeGuard(element: GameElement): element is Enemy {
    return element.type === ElementType.Enemy;
  }

  exitTypeGuard(element: GameElement): element is Exit {
    return element.type === ElementType.Exit;
  }

  itemTypeGuard(element: GameElement): element is Item {
    return element.type === ElementType.Item;
  }

  handleInteraction(element: GameElement): void {
    if (this.enemyTypeGuard(element)) {
      this.handleEnemyInteraction(element);
    } else if (this.exitTypeGuard(element)) {
      this.handleExitInteraction(element);
    } else if (this.itemTypeGuard(element)) {
      this.handleItemInteraction(element);
    }
  }

  handleEnemyInteraction(enemy: Enemy): void {
    this.opponent = enemy;
    this.elements = this.elements.filter(element => {
      if (element && this.enemyTypeGuard(element)) {
        const curId = element.id;
        if (curId === this.opponent?.id) {
          return false;
        }
      }
      return true;
    });
  }

  handleExitInteraction(exit: Exit): void {
    this.currentStage++;
    this.player.gainExp(exit.exp);
    this.genElements();
  }

  handleItemInteraction(item: Item): void {
    // mark the item for angular component
    // so dialog box can be shown
    this.item = item;

    // remove the item from the map
    this.elements = this.elements.filter(element => {
      if (element && this.itemTypeGuard(element)) {
        const curId = element.id;
        if (curId === item.id) {
          return false;
        }
      }
      return true;
    });
  }
}
