import { Injectable } from '@angular/core';

import  { BehaviorSubject } from 'rxjs';

import { Player } from '../classes/Player';
import { Enemy } from '../classes/Enemy';
import { GameElement } from '../interfaces/GameElement';


@Injectable({
  providedIn: 'root'
})
export class CombatService {
  private playerSource = new BehaviorSubject<Player | null>(null);
  private enemySource = new BehaviorSubject<Enemy | null>(null);
  player = this.playerSource.asObservable();
  enemy = this.enemySource.asObservable();


  constructor() { }

  setPlayer(player: Player) {
    this.playerSource.next(player);
  }

  setEnemy(enemy: Enemy | undefined) {
    if(enemy) {
      this.enemySource.next(enemy);
    }
  }

  getPlayer(): Player | null {
    return this.playerSource.getValue();
  }

  getEnemy(): Enemy | null {
    return this.enemySource.getValue();
  }

  clearPlayer() {
    this.playerSource.next(null);
  }

  clearEnemy() {
    this.enemySource.next(null);
  }
}
