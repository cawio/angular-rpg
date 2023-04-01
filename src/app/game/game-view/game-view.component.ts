import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularRpg } from '../../classes/AngularRpg';
import { SharedDataService } from '../../shared-data.service';
import { AngularRpgService } from '../angular-rpg.service';
import { CombatService } from '../combat.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {
  playerName: string = '';
  angularRpg!: AngularRpg;

  constructor(
    private sharedDataService: SharedDataService,
    private angularRpgService: AngularRpgService,
    private combatService: CombatService,) { }

  ngOnInit(): void {
    // game could be set if game was saved and player is returning to game
    const gameNotSet = this.angularRpgService.getAngularRpg() === undefined;
    if (gameNotSet) {
      this.angularRpgService.itemConfigData$.subscribe(itemConfigData => {
        this.playerName = this.sharedDataService.getPlayerName();
        this.angularRpg = new AngularRpg(this.playerName, 10, 10, itemConfigData);
        this.angularRpgService.setAngularRpg(this.angularRpg);
      });
    }
  }

  ngOnDestroy(): void {
    this.resetCombatService();
    this.angularRpgService.clearAngularRpg();
  }

  resetCombatService(): void {
    this.combatService.clearPlayer();
    this.combatService.clearEnemy();
  }
}
