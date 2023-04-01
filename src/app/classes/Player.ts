import { MoveableEntity } from './MovableEntity';
import { Item } from './Item';
import { ElementType } from '../enums/ElementType';
import { Combatant } from '../interfaces/Combatant';
import { Attributes } from '../interfaces/Attributes';
import { MoveableEntityInitObj } from '../interfaces/MoveableEntityInitObj'
import { PlayerData } from '../interfaces/PlayerData';
import { ItemData } from '../interfaces/ItemData';
import { ItemConfigData } from '../interfaces/ItemConfigData';

export class Player extends MoveableEntity implements Combatant {
  name = 'n/a';
  level = 1;
  exp = 0;
  maxHealth = 20;
  currentHealth = this.maxHealth;
  attributes: Attributes = { strength: 10, armor: 5, evasion: 0.1 };
  inventory: Item[] = [];
  readonly icon = '🧙‍♂️';
  readonly type = ElementType.Player;

  constructor(name: string, width: number, height: number, x: number, y: number) {
    super(width, height, x, y);
    this.name = name;
  }

  static createPlayerFromSaveData(movEntInitObj: MoveableEntityInitObj, playerData: PlayerData, itemConfigData: ItemConfigData[]) {
    let newPlayer = new Player(playerData.name, movEntInitObj.width, movEntInitObj.height, movEntInitObj.x, movEntInitObj.y);
    newPlayer.level = playerData.level;
    newPlayer.exp = playerData.exp;
    newPlayer.maxHealth = playerData.maxHealth;
    newPlayer.currentHealth = playerData.currentHealth;
    newPlayer.attributes = playerData.attributes;
    newPlayer.inventory = playerData.inventory.map(itemData => {
      const itemConfig = itemConfigData.filter(itemConfig => itemConfig.actionType === itemData.actionType)[0];
      return Item.createItemFromSaveData(itemData, itemConfig);
    });

    return newPlayer;
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

  gainExp(amount: number): void {
    this.exp += amount;
    // check if player leveled up
    if (this.exp >= this.level * 100) {
      this.levelUp();
    }
  }

  levelUp(): void {
    this.level++;
    this.exp = 0;
    this.maxHealth += 10;
    this.currentHealth = this.maxHealth;
    this.attributes.strength += 5;
    this.attributes.armor += 2;
    this.attributes.evasion += 0.05;
  }
}