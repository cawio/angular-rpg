import { Pipe, PipeTransform } from '@angular/core';
import { EnemyType } from '../enums/EnemyType';

@Pipe({
  name: 'enemyName'
})
export class EnemyNamePipe implements PipeTransform {

  transform(value: EnemyType): string {
    switch(value) {
      case EnemyType.ForestZombie:
        return 'Forest Zombie';
      case EnemyType.ForestSpider:
        return 'Forest Spider';
      case EnemyType.ForestBat:
        return 'Forest Bat';
      default:
        return 'Unknown Enemy';
    }
  }
}
