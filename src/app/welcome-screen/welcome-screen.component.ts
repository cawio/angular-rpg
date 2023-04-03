import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { AngularRpgService } from '../game/angular-rpg.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit{
  playerName = '';
  constructor(
    private sharedDataService: SharedDataService,
    // private angularRpgService: AngularRpgService,
  ) { }

  ngOnInit(): void { }

  onStartJourneyClicked() {
    this.sharedDataService.setPlayerName(this.playerName);
  }
}
