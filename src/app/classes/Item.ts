import { Position } from "../interfaces/Position";
import { ElementType } from "../enums/ElementType";
import { Player } from "./Player";
import { ItemActionType } from "../enums/ItemActionType";
import { ItemData } from "../interfaces/ItemData";

export class Item {
  readonly type = ElementType.Item;
  readonly position: { x: number, y: number };
  constructor(
    readonly name: string,
    readonly description: string,
    readonly icon: string,
    readonly id: string,
    readonly actionType: ItemActionType,
    public action: (player: Player, myID: string) => void,
    x: number,
    y: number,
  ) {
    this.position = { x, y };
  }

  static createItemFromJson(itemJson: ItemData): Item {
    // set the item name
    let name: string;
    let icon: string;
    let description: string;
    let action: (player: Player, myID: string) => void;
    switch(itemJson.actionType) {
      case ItemActionType.Heal:
        name = 'Healing Apple';
        icon = '🍎';
        description = 'Heals 5 HP';
        action = (player: Player, myID: string) => {
          player.heal(5);
          player.inventory = player.inventory.filter(item => item.id !== myID);
        }
        break;
      default:
        name = 'Unknown Item';
        icon = '❓';
        description = 'Unknown Item';
        action = (player: Player, myID: string) => {
          console.log('Unknown Item');
          player.inventory = player.inventory.filter(item => item.id !== myID);
        }
    }

    const newItem = new Item(name, description, icon, itemJson.id, itemJson.actionType, action, itemJson.position?.x || 0, itemJson.position?.y || 0);

    return newItem;
  }

  getPosition(): Position {
    return this.position;
  }
}
