import { MoveableEntity } from './MovableEntity';
import { Item } from './Item';
import { ElementType } from '../enums/ElementType';
import { Combatant } from '../interfaces/Combatant';

export class Player extends MoveableEntity implements Combatant {
  level = 0;
  experience = 0;
  maxHealth = 20;
  currentHealth = this.maxHealth;
  attributes = { strength: 10, armor: 5, evasion: 0.1 };
  inventory: Item[] = [];
  readonly display = '🧙‍♂️';
  readonly type = ElementType.Player;

  constructor (
    public name: string,
    x: number,
    y: number,
  ) { super(x, y); }

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

  gainExp(amount: number): void {
    this.experience += amount;
    // check if player leveled up
    if (this.experience >= this.level * 100) {
      this.levelUp();
    }
  }

  levelUp(): void {
    this.level++;
    this.maxHealth += 10;
    this.currentHealth = this.maxHealth;
    this.attributes.strength += 5;
    this.attributes.armor += 2;
    this.attributes.evasion += 0.05;
  }
}
