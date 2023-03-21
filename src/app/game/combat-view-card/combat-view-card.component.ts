import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-combat-view-card',
  templateUrl: './combat-view-card.component.html',
  styleUrls: ['./combat-view-card.component.css']
})
export class CombatViewCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() healthBarPercent: number = 0;
  @Input() healthBarColor: string = '';
  imgSrc: string = '';

  ngOnInit(): void {
    switch(this.name) {
      case 'Forest Zombie':
        this.imgSrc = './assets/images/zombie.png';
        'assets'
        break;
      case 'Forest Spider':
        this.imgSrc = './assets/images/spider.png';
        break;
      case 'Forest Bat':
        this.imgSrc = './assets/images/bat.png';
        break;
      default:
        this.imgSrc = './assets/images/player.png';
    }
  }
}
