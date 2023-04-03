import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import  *  as FileSaver  from 'file-saver';

import { AngularRpg } from '../../classes/AngularRpg';
import { GameElement } from '../../interfaces/GameElement';
import { Inputs } from '../../enums/Inputs';
import { CombatService } from '../combat.service';
import { AngularRpgService } from '../angular-rpg.service';
import { Player } from '../../classes/Player';
import { Enemy } from '../../classes/Enemy';
import { Item } from '../../classes/Item';
import { DialogComponent } from '../dialog/dialog.component';
import { AngularRpgSave } from '../../classes/AngularRpgSave';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit {
  angularRpg?: AngularRpg;
  gameElements: GameElement[] = [];

  constructor(
    private router: Router,
    private combatService: CombatService,
    private angularRpgService: AngularRpgService,
    public itemInteractionDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const angularRpgFromService = this.angularRpgService.getAngularRpg()!;
    if (angularRpgFromService) {
      this.angularRpg = angularRpgFromService;
    }

    if(this.angularRpg) {
      const player = this.combatService.getPlayer();
      if (player) {
        this.angularRpg.player = player;
      }
      this.gameElements = this.angularRpg.elements;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent): void {
    if (!this.angularRpg) {
      return;
    }

    switch(event.key) {
      case 'w':
      case 'ArrowUp':
        this.gameElements = this.angularRpg.operateGame(Inputs.Up);
        break;
      case 'a':
      case 'ArrowLeft':
        this.gameElements = this.angularRpg.operateGame(Inputs.Left);
        break;
      case 's':
      case 'ArrowDown':
        this.gameElements = this.angularRpg.operateGame(Inputs.Down);
        break;
      case 'd':
      case 'ArrowRight':
        this.gameElements = this.angularRpg.operateGame(Inputs.Right);
        break;
    }

    if(this.angularRpg.opponent) {
      this.goToCombat(this.angularRpg.player, this.angularRpg.opponent);
      this.angularRpg.opponent = undefined;
    }

    if(this.angularRpg.item) {
      this.showItemInteractionDialog(this.angularRpg.item);
      this.angularRpg.item = undefined;
    }

    // this forces the view to update
    let newElementsArray: GameElement[] = [];
    this.gameElements.forEach((element: GameElement) => {
      newElementsArray.push(element);
    });
    this.gameElements = newElementsArray;
  }

  goToCombat(player: Player, opponent: Enemy): void {
    this.combatService.setPlayer(player);
    this.combatService.setEnemy(opponent);
    this.router.navigate(['/game/combat']);
  }

  showItemInteractionDialog(item: Item): void {
    if (!this.angularRpg) {
      return;
    }

    const config: MatDialogConfig = {
      disableClose: true,
      data: {
        title: `You found a ${item.name}!`,
        message: item.description,
        btn1: {
          title: 'Use',
          matStyle: 'primary',
          action: () => {
            item.action(this.angularRpg!.player, item.id);
            this.itemInteractionDialog.closeAll();
          },
        },
        btn2: {
          title: 'Pick Up',
          matStyle: 'primary',
          action: () => {
            this.angularRpg!.player.inventory.push(item);
            this.itemInteractionDialog.closeAll();
          },
        }
      }
    }

    this.itemInteractionDialog.open(DialogComponent, config);
  }

  onSaveClicked(): void {
    if (!this.angularRpg) {
      return;
    }

    const data = new AngularRpgSave(this.angularRpg).transformToJSON();
    const blob = new Blob([data], {type: 'application/json, charset=utf-8'});
    const player = this.angularRpg.player.name || 'unknownplayer';
    FileSaver.saveAs(blob, `arpg-${player}-save.json`);
  }
}
