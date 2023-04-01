import { Injectable, OnDestroy } from '@angular/core';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularRpg } from '../classes/AngularRpg';
import { ItemConfigData } from '../interfaces/ItemConfigData';

@Injectable({
  providedIn: 'root'
})
export class AngularRpgService implements OnDestroy {
  private angularRpg?: AngularRpg;
  private dataSubject: Subject<ItemConfigData[]> = new Subject<ItemConfigData[]>();
  public itemConfigData$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadItemConfigData();
  }

  ngOnDestroy(): void {
    this.dataSubject.unsubscribe();
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

  private loadItemConfigData(): void {
    this.http.get<ItemConfigData[]>('../../assets/data/configs/item-config-data.json').subscribe((data: ItemConfigData[]) => {
      this.dataSubject.next(data);
    });
  }
}
