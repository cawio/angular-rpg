import { ItemActionType } from '../enums/ItemActionType';
import { Position } from './Position';

export interface ItemData {
  id: string;
  name: string;
  type: number;
  actionType: ItemActionType;
  position?: Position;
}