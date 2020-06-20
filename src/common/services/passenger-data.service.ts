import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { Passenger } from '../models/passanger.model';

@Injectable( {providedIn: 'root'} )
export class PassengerDataService {

    private currentPassengerData: Passenger[] = [
        {
          name: 'Rounaq',
          age: 30,
          dateOfBirth: '25/07/1989',
          passportNumber: 'R105070',
          flightName: 'Air Asia',
          seatNo: 'O1',
          address: 'Chennai',
          travelDate: '23/10/2019',
          ancillaryService: ['Extra 20 kg baggage', 'lodging'],
          wheelChair: true,
          isCheckedIn: false,
          isHavingInfant: false,
          meals: 'Veg',
          isSpecialMeals: true,
          shoppingItems: ['face cream', 'hair gel']
        },
        {
          name: 'Nasrul',
          age: 27,
          dateOfBirth: '05/06/1992',
          passportNumber: 'N124081',
          address: 'Bangalore',
          flightName: 'Air Asia',
          seatNo: 'O3',
          travelDate: '23/10/2019',
          ancillaryService: ['Extra 10 kg baggage'],
          wheelChair: false,
          isCheckedIn: true,
          isHavingInfant: false,
          meals: 'NonVeg',
          isSpecialMeals: true,
          shoppingItems: ['face wash']
        },
        {
          name: 'Aman',
          age: 21,
          dateOfBirth: '16/02/1997',
          passportNumber: 'A154489',
          flightName: 'Indigo',
          address: 'Delhi',
          seatNo: 'O2',
          travelDate: '23/10/2019',
          ancillaryService: ['lodging', 'cab Services'],
          wheelChair: false,
          isCheckedIn: true,
          isHavingInfant: true,
          meals: 'NonVeg',
          isSpecialMeals: false,
          shoppingItems: ['liquid makeup', 'hair gel', 'pencils']
        }
      ];

    public dataChange: BehaviorSubject<Passenger[]> =
        new BehaviorSubject<Passenger[]>(this.currentPassengerData);

    public setPassengerData(passengerData: Passenger[]): void {
        this.currentPassengerData = passengerData;
        this.dataChange.next(this.currentPassengerData);
    }

    public setCheckedInPassangerDataPerFlight(passengerData: Passenger[], flightName: string): void {
      this.currentPassengerData = this.currentPassengerData.filter((currentPassanger: Passenger) => {
        return currentPassanger.flightName !== flightName && currentPassanger.isCheckedIn;
      });
      this.currentPassengerData = this.currentPassengerData.concat(passengerData);
      this.dataChange.next(this.currentPassengerData);
    }

    public setPassangerDataPerFlight(passengerData: Passenger[], flightName: string): void {
      this.currentPassengerData = this.currentPassengerData.filter((currentPassanger: Passenger) => {
        return currentPassanger.flightName !== flightName;
      });
      this.currentPassengerData = this.currentPassengerData.concat(passengerData);
      this.dataChange.next(this.currentPassengerData);
    }

    public getPassangerData(): Observable<Passenger[]> {
      return this.dataChange.asObservable();
    }

    public getPassangerDataPerFlight(flightName: string): Passenger[] {
      let passangersPerFlight: Passenger[];
      passangersPerFlight = this.currentPassengerData.filter( (currentData) => {
        return currentData.flightName === flightName;
      });
      return passangersPerFlight;
    }

    public getCheckedInPassangerData(flightName: string): Passenger[] {
      let passangersPerFlight: Passenger[];
      passangersPerFlight = this.currentPassengerData.filter( (currentData) => {
        return currentData.flightName === flightName && currentData.isCheckedIn;
      });
      return passangersPerFlight;
    }
}
