import { ItemActionType } from '../enums/ItemActionType';
import { Position } from './Position';

export interface ItemData {
  id: string;
  type: number;
  actionType: ItemActionType;
  position?: Position;
}