import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable( {providedIn: 'root'} )
export class FlightDataService {

    private currentFlightData: Flight[] = [
      { name: 'Air Asia', ancillaryService: ['baggae', 'accomoda'],
        meals: ['briyani', 'rice'], totalSeats: 180, shoppingItems: [], destination: '', departureTime: '' },
      { name: 'Indigo', ancillaryService: [], meals: [], totalSeats: 200, shoppingItems: [], destination: '', departureTime: '' },
      { name: 'Jet Airways', ancillaryService: [], meals: [], totalSeats: 210, shoppingItems: [], destination: '', departureTime: '' },
      { name: 'Go Air', ancillaryService: [], totalSeats: 170, meals: [], shoppingItems: [], destination: '', departureTime: '' },
      { name: 'Vistara', ancillaryService: [], totalSeats: 210, meals: [], shoppingItems: [], destination: '', departureTime: '' },
    ];

    public dataChange: BehaviorSubject<Flight[]> =
          new BehaviorSubject<Flight[]>(this.currentFlightData);

    public setFlightData(ancillaryData: Flight[]): void {
        this.currentFlightData = ancillaryData;
        this.dataChange.next(this.currentFlightData);
    }

    public getFlightData(): Observable<Flight[]> {
      return this.dataChange.asObservable();
    }
}
