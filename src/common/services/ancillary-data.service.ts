import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Ancillary } from '../models/ancillary.model';

@Injectable( {providedIn: 'root'} )
export class AncillaryDataService {

    private currentAncillaryData: Ancillary[] = [
        {
          name: '20Kg Baggage',
          description: 'Extra 20Kg Baggage',
          type: {others:  true}
        },
        {
          name: 'accommodation',
          description: 'Free accommodation',
          type: {others:  true}
        },
        {
          name: 'wine',
          description: 'Foreign Wine',
          type: {shoppingItem:  true}
        },
        {
          name: 'hair gel',
          description: 'Himalayan hair gel',
          type: {shoppingItem:  true}
        },
        {
          name: 'Briyani',
          description: 'Meals',
          type: {specialMeal:  true}
        }
      ];

      public dataChange: BehaviorSubject<Ancillary[]> =
          new BehaviorSubject<Ancillary[]>(this.currentAncillaryData);

    public setAncillaryData(ancillaryData: Ancillary[]): void {
        this.currentAncillaryData = ancillaryData;
        this.dataChange.next(this.currentAncillaryData);
    }

    public getAncillaryData(): Observable<Ancillary[]> {
      return this.dataChange.asObservable();
    }
}
