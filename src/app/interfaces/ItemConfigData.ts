import { ItemActionType } from '../enums/ItemActionType';

export interface ItemConfigData {
  actionType: ItemActionType;
  name: string;
  description: string;
  icon: string;
}
