import { Attributes } from './Attributes';

export interface Combatant {
  maxHealth: number;
  currentHealth: number;
  attributes: Attributes;

  attack(target: Combatant): number;
  takeDamage(damage: number): void;
  heal(healAmount: number): void;
  isDead(): boolean;
}