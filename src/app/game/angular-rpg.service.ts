import { Injectable, OnDestroy } from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';

@Injectable({
  providedIn: 'root'
})
export class AngularRpgService implements OnDestroy {
  private angularRpg?: AngularRpg;
  constructor() { }

  ngOnDestroy(): void {
    console.log('AngularRpgService.ngOnDestroy() called');
  }

  setAngularRpg(angularRpg: AngularRpg): void {
    this.angularRpg = angularRpg;
  }

  getAngularRpg(): AngularRpg | undefined {
    return this.angularRpg;
  }

  clearAngularRpg(): void {
    this.angularRpg = undefined;
  }
}
