import { MoveableEntity } from './MovableEntity';
import { Combatant } from '../interfaces/Combatant';
import { Item } from './Item';
import { Inputs } from '../enums/Inputs';
import { ElementType } from '../enums/ElementType';
import { GameElement } from '../interfaces/GameElement';
import { EnemyType } from '../enums/EnemyType';
import { Attributes } from '../interfaces/Attributes';

export class Enemy extends MoveableEntity implements Combatant {
  maxHealth = 10;
  currentHealth = this.maxHealth;
  icon: string;
  attributes: Attributes = { strength: 10, armor: 3, evasion: 0.1 };
  inventory: Item[] = [];
  exp = 10;
  readonly type = ElementType.Enemy;

  constructor (
    readonly id: string,
    readonly enemyType: EnemyType,
    stage: number,
    width: number,
    height: number,
    x: number,
    y: number,
  ) {
    super(width, height, x, y);
    this.icon = this.initDisplay(enemyType);
    this.initAttributes(stage);
  }

  randomMove(elements: GameElement[]): void {
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
      case Inputs.Up:
        this.move(Inputs.Up, elements, this.type);
        break;
      case Inputs.Down:
        this.move(Inputs.Down, elements, this.type);
        break;
      case Inputs.Left:
        this.move(Inputs.Left, elements, this.type);
        break;
      case Inputs.Right:
        this.move(Inputs.Right, elements, this.type);
        break;
    }
  }

  attack(target: Combatant): number {
    // check if attack hits
    const miss = !(Math.random() > target.attributes.evasion);
    if (miss) {
      return 0;
    }
    const damage = this.attributes.strength - target.attributes.armor;
    target.currentHealth -= damage;

    return damage;
  }

  takeDamage(damage: number): void {
    this.currentHealth -= damage;
  }

  heal(amount: number): void {
    this.currentHealth += amount;
    // prevent overhealing
    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
  }

  isDead(): boolean {
    return this.currentHealth <= 0;
  }

  initDisplay(enemyType: EnemyType): string {
    if (enemyType === EnemyType.ForestZombie) {
      return '🧟';
    } else if (enemyType === EnemyType.ForestBat) {
      return '🦇';
    } else if (enemyType === EnemyType.ForestSpider) {
      return '🕷️';
    }
    return '❓';
  }

  initAttributes(stage: number): void {
    let scalingFactor = 1 + (stage - 1) * 0.1; // increase attributes by 10% per stage
    if (this.enemyType === EnemyType.ForestZombie) {
      this.maxHealth = Math.round(15 * scalingFactor);
      this.currentHealth = this.maxHealth;
      this.attributes = {
        strength: Math.round(10 * scalingFactor),
        armor: Math.round(5 * scalingFactor),
        evasion: 0.1
      };
    } else if (this.enemyType === EnemyType.ForestBat) {
      this.maxHealth = Math.round(10 * scalingFactor);
      this.currentHealth = this.maxHealth;
      this.attributes = {
        strength: Math.round(10 * scalingFactor),
        armor: 0,
        evasion: 0.5
      };
    } else if (this.enemyType === EnemyType.ForestSpider) {
      this.maxHealth = Math.round(10 * scalingFactor);
      this.currentHealth = this.maxHealth;
      this.attributes = {
        strength: Math.round(10 * scalingFactor),
        armor: 0,
        evasion: 0.5
      };
    }
  }
}
