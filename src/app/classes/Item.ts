import { Position } from "../interfaces/Position";
import { ElementType } from "../enums/ElementType";
import { Player } from "./Player";
import { ItemActionType } from "../enums/ItemActionType";
import { ItemData } from "../interfaces/ItemData";
import { ItemConfigData } from "../interfaces/ItemConfigData";

export class Item {
  readonly type = ElementType.Item;
  readonly position: { x: number, y: number };
  readonly name: string;
  readonly description: string;
  readonly icon: string;

  constructor(
    readonly id: string,
    readonly actionType: ItemActionType,
    itemConfigData: ItemConfigData,
    public action: (player: Player, myID: string) => void,
    x: number,
    y: number,
  ) {
    this.position = { x, y };
    this.name = itemConfigData.name;
    this.description = itemConfigData.description;
    this.icon = itemConfigData.icon;
  }

  static createItemFromSaveData(itemData: ItemData, itemConfig: ItemConfigData): Item {
    // set the item name
    let name: string;
    let icon: string;
    let description: string;
    let action: (player: Player, myID: string) => void;
    console.log(itemConfig)
    switch(itemData.actionType) {
      case ItemActionType.Heal:
        name = itemConfig.name;
        icon = itemConfig.icon;
        description = itemConfig.description;
        action = (player: Player, myID: string) => {
          player.heal(5);
          player.inventory = player.inventory.filter(item => item.id !== myID);
        }
        break;
      default:
        name = itemConfig.name;
        icon = itemConfig.icon;
        description = itemConfig.description	;
        action = (player: Player, myID: string) => {
          console.log('Unknown Item');
          player.inventory = player.inventory.filter(item => item.id !== myID);
        }
    }

    const newItem = new Item(itemData.id, itemData.actionType, itemConfig, action, itemData.position?.x || 0, itemData.position?.y || 0);

    return newItem;
  }

  getPosition(): Position {
    return this.position;
  }
}
