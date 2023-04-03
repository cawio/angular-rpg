import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularRpg } from '../classes/AngularRpg';
import { ItemConfigData } from '../interfaces/ItemConfigData';

@Injectable({
  providedIn: 'root'
})
export class AngularRpgService implements OnDestroy {
  private angularRpg?: AngularRpg;
  private dataBehaviorSubject: BehaviorSubject<ItemConfigData[] | null> = new BehaviorSubject<ItemConfigData[] | null>(null);
  public itemConfigData$ = this.dataBehaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  ngOnDestroy(): void {
    this.dataBehaviorSubject.unsubscribe();
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

  public loadItemConfigData(): void {
    console.log('loading item config data');
    this.http.get<ItemConfigData[]>('../../assets/data/configs/item-config-data.json').subscribe((data: ItemConfigData[]) => {
      console.log('angular-rpg-service data loaded:', data);
      this.dataBehaviorSubject.next(data);
    });
  }
}
