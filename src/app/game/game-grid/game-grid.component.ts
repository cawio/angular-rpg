import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ElementType } from '../enums/ElementType';
import { GameElement } from '../interfaces/GameElement';
import { Tile } from '../classes/Tile';
@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css'],
})
export class GameGridComponent implements OnInit, OnChanges {
  @Input() gridWidth: number = 0;
  @Input() gridHeight: number = 0;
  @Input() gameElements: GameElement[] = [];
  grid: Tile[][] = [];
  type = ElementType; // set type to use enum in the template

  constructor( ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inizializeGrid();
    this.placeGameElements();
  }

  inizializeGrid(): void {
    this.grid = [];
    for (let y = 0; y < this.gridWidth; y++) {
      let row: Tile[] = [];
      for (let x = 0; x < this.gridHeight; x++) {
        row.push(new Tile(x, y));
      }
      this.grid.push(row);
    }
  }

  placeGameElements(): void {
    if (this.gameElements) {
      this.gameElements.forEach((element: GameElement) => {
        if (element) {
          const elPos = element.getPosition();
          this.grid[elPos.y][elPos.x].occupant = element;
        }
      });
    }
  }
}
