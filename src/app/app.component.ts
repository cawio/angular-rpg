import { Component, OnInit } from '@angular/core';
import { AngularRpgService } from './game/angular-rpg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-RPG';

  constructor(private angularRpgService: AngularRpgService) { }

  ngOnInit(): void {
    this.angularRpgService.loadItemConfigData();
  }
}
