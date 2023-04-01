import { Component } from '@angular/core';
import { AngularRpgSaveFile } from '../interfaces/AngularRpgSaveFile';
import { Player } from '../classes/Player';
import { MoveableEntityInitObj } from '../interfaces/MoveableEntityInitObj';
import { ElementType } from '../enums/ElementType';
import { Enemy } from '../classes/Enemy';
import { EnemyData } from '../interfaces/EnemyData';
import { ItemData } from '../interfaces/ItemData';
import { Item } from '../classes/Item';
import { ObstructionData } from '../interfaces/ObstructionData';
import { Obstruction } from '../classes/Obstruction';
import { ExitData } from '../interfaces/ExitData';
import { Exit } from '../classes/Exit';
import { AngularRpg } from '../classes/AngularRpg';
import { AngularRpgService } from '../game/angular-rpg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  acceptedFileExtensions = '.json'

  constructor(
    private angularRpgSevice: AngularRpgService,
    private router: Router
  ) { }

  public onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const saveData = JSON.parse(reader.result as string) as AngularRpgSaveFile;
        const moveablePlayer: MoveableEntityInitObj = {
          width: saveData.width,
          height: saveData.height,
          x: saveData.player.position.x,
          y: saveData.player.position.y,
        }

        this.angularRpgSevice.itemConfigData$.subscribe(itemConfigData => {
          const player: Player = Player.createPlayerFromSaveData(moveablePlayer, saveData.player, itemConfigData);
          const elements = saveData.elements.map(element => {
            switch(element.type) {
              case ElementType.Enemy:
                const enemyData = element as EnemyData;
                const enemy = new Enemy(
                  enemyData.id,
                  enemyData.enemyType,
                  saveData.stage,
                  saveData.width,
                  saveData.height,
                  enemyData.position.x,
                  enemyData.position.y,
                );
                return enemy;
              case ElementType.Item:
                const itemData = element as ItemData;
                const itemConfig = itemConfigData.filter(itemConfig => itemConfig.actionType === itemData.actionType)[0];
                return Item.createItemFromSaveData(itemData, itemConfig);
              case ElementType.Obstruction:
                const obstructionData = element as ObstructionData;
                return new Obstruction(obstructionData.position.x, obstructionData.position.y);
              case ElementType.Exit:
                const exitData = element as ExitData;
                return new Exit(exitData.position.x, exitData.position.y, saveData.stage)
              default:
                throw new Error('Invalid element type');
            }
          });

          // init the game
          const elementsWithPlayer = [player, ...elements];
          const game = new AngularRpg(player, saveData.width, saveData.height, itemConfigData, elementsWithPlayer, saveData.stage);
          this.angularRpgSevice.setAngularRpg(game);
          this.router.navigate(['/game/level']);
        });
      };

      reader.readAsText(file, 'UTF-8');
    }
  }
}
