import { Component, Input } from '@angular/core';
import { Player } from '../../classes/Player';

@Component({
  selector: 'app-game-player-info',
  templateUrl: './game-player-info.component.html',
  styleUrls: ['./game-player-info.component.css']
})
export class GamePlayerInfoComponent {
  @Input() player?: Player;

}
