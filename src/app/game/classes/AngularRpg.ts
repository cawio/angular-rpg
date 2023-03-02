import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Exit } from "./Exit";
import { Obstruction } from "./Obstruction";
import { GameElement } from "../interfaces/GameElement";
import { Position } from "../interfaces/Position";
import { Inputs } from "../enums/Inputs";
import { ElementType } from "../enums/ElementType";
import { EnemyType } from "../enums/EnemyType";

export class AngularRpg {
  player: Player;
  opponent?: Enemy;
  currentStage = 0;
  elements: GameElement[] = [];

  constructor(
    playerName: string,
    readonly height: number,
    readonly width: number
  ) {
    // init player object
    const playerPos = this.genRandomPos();
    this.player = new Player(playerName, playerPos.x, playerPos.y);

    // generate Game Elements
    this.generateElements();
  }

  operateGame(direction: Inputs): GameElement[] {
    // handle the players move
    this.elements = this.player.move(direction, this.elements, ElementType.Player);


    // check if the player is on an enemy
    this.opponent = this.checkIfPlayerOnTileWithEnemy();
    if (this.opponent) {
      // filter out the enemy by its id
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

    // if the player has reached the exit
    const exitReached = this.checkIfPlayerOnTileWithExit();
    if (exitReached) {
      this.currentStage++;
      console.log('player before exp gain:', this.player);
      this.player.gainExp(exitReached.stageCompletedExp);
      console.log('player after exp gain:', this.player);
      this.generateElements();

      return this.elements;
    }

    // move each enemy
    this.elements.forEach(element => {
      if (element?.type === ElementType.Enemy) {
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

  generateElements(): void {
    // ! player is persistent so they are not generated here
    // Clear game elements
    this.clearElements();

    // Add player
    this.addElements([this.player]);

    // Generate obstructions
    for (let i = 0; i < 3; i++) {
      this.addElements(this.genObstrCluster(this.elements.map(element => element?.getPosition()) as Position[]));
    }

    // add exit
    const exitPos = this.genRandomPos(this.elements.map(element => element?.getPosition()) as Position[]);
    const exit = new Exit(this.currentStage + 1, exitPos.x, exitPos.y);
    this.addElements([exit]);

    // Generate enemies
    // ? current stage is used to determine the number of enemies
    // ? i think stage + 1 is a good number
    const enemies = this.genEnemies(this.currentStage + 1);
    this.addElements(enemies);

    // TODO Generate items
    // ...
  }

  genEnemies(amount: number): Enemy[] {
    const enemies: Enemy[] = [];
    const blockedPositions: Position[] = this.elements.map(element => element?.getPosition()) as Position[];
    for (let i = 0; i < amount; i++) {
      const position = this.genRandomPos(blockedPositions);
      blockedPositions.push(position);
      const typeToGen: number = Math.floor(Math.random() * (Object.keys(EnemyType).length / 2));
      const enemy = new Enemy('enemy' + i, typeToGen, position.x, position.y);
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
      } else {
        return position;
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

    // handle no free spaces
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

  checkIfPlayerOnTileWithExit(): Exit | undefined {
    const exit = (this.elements.filter(element => {
      if(this.exitTypeGuard(element)) {
        return true;
      }
      return false;
    }) as Exit[])[0];

    const exitPos = exit.getPosition();
    const playerPos = this.player.getPosition();
    if (exitPos.x === playerPos.x && exitPos.y === playerPos.y) {
      return exit;
    }

    return undefined;
  }

  checkIfPlayerOnTileWithEnemy(): Enemy | undefined {
    const enemies = this.elements.filter(element => {
      if(this.enemyTypeGuard(element)) {
        return true;
      }
      return false;
    }) as Enemy[];

    const enemy = enemies.find(enemy => {
      const enemyPos = enemy.getPosition();
      const playerPos = this.player.getPosition();
      return enemyPos.x === playerPos.x && enemyPos.y === playerPos.y;
    });

    return enemy;
  }

  enemyTypeGuard(element: GameElement): element is Enemy {
    return element.type === ElementType.Enemy;
  }

  exitTypeGuard(element: GameElement): element is Exit {
    return element.type === ElementType.Exit;
  }
}
