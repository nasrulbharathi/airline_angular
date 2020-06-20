import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { FlightLayout } from 'src/common/models/flight.model';
import { Passenger } from 'src/common/models/passanger.model';

import { SeatMapConfigService } from './seat-map-config.service';

export interface SeatStructure {
  key?: string;
  status?: seatStatusEnumValues;
  seatLabel?: string;
  seatNo?: string;
}

export enum seatStatusEnumValues {
  available = 'available',
  booked = 'booked',
  bookedwithchild = 'bookedwithchild',
  bookedwithwheel = 'bookedwithwheel',
  unavailable = 'unavailable',
  marked = 'marked',
  specialMeals = 'specialMeals',
  ordinaryMeals = 'ordinaryMeals'
}

@Component({
  selector: 'ar-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
  providers: [SeatMapConfigService]
})
export class SeatMapComponent implements OnInit {

  private seatStatus: any = {};

  constructor(public seatMapConfigService: SeatMapConfigService) { }

  @Input()
  public flightName: string;

  @Input()
  public passangerDataofFlight: Passenger[];

  @Input()
  public selectedPassangerData: Passenger;

  @Input()
  public config: string;

  @Output()
  public emitSeats: EventEmitter<any> = new EventEmitter<any>();

  public seatLocalEnumStatus = seatStatusEnumValues;
  public seatMap2 = [];
  public seatLegends = [];

  public ngOnInit(): void {
    this.prepareFlightLayout(this.seatMapConfigService.flightLayout.find(
      (layout: FlightLayout) => {
        return layout.name === this.flightName;
      }
    ));
    if (this.config === 'inFlight') {
      this.seatLegends = [ this.seatLocalEnumStatus.specialMeals,
                           this.seatLocalEnumStatus.ordinaryMeals
                         ];
    } else {
      this.seatLegends = [ this.seatLocalEnumStatus.available, this.seatLocalEnumStatus.booked,
        this.seatLocalEnumStatus.bookedwithchild, this.seatLocalEnumStatus.bookedwithwheel,
        this.seatLocalEnumStatus.marked
      ];
    }
    this.markSeatsOfExistingPassanger(this.passangerDataofFlight);
  }

  public markSeatsOfExistingPassanger(passangerData: Passenger[]) {
    passangerData.forEach( (passanger) => {
      if (passanger.isCheckedIn) {
        this.seatMap2.forEach ( (seatRow) => {
          // tslint:disable-next-line: triple-equals
          if (seatRow.seatRowLabel == passanger.seatNo.charAt(0)) {
            seatRow.seats.forEach( (seatBook) => {
              // tslint:disable-next-line: triple-equals
              if (seatBook.seatLabel == passanger.seatNo) {
                if (this.config === 'inFlight') {
                  if (passanger.isSpecialMeals) {
                    seatBook.status = this.seatLocalEnumStatus.specialMeals;
                  } else {
                    seatBook.status = this.seatLocalEnumStatus.ordinaryMeals;
                  }
                } else if (passanger.wheelChair) {
                  seatBook.status = this.seatLocalEnumStatus.bookedwithwheel;
                } else if (passanger.isHavingInfant) {
                  seatBook.status = this.seatLocalEnumStatus.bookedwithchild;
                } else {
                  seatBook.status = this.seatLocalEnumStatus.booked;
                }
              }
            });
          }
        });
      }
    });
  }

  public generateSeats(layout, rowLabel: string): SeatStructure[] {
    const rowSeats: SeatStructure[] = [];
    for ( let i = 0; i < layout.length; i++) {
      const obj: SeatStructure = {
        key: rowLabel + '-' + (i + 1),
        status: this.seatLocalEnumStatus.available,
        // tslint:disable-next-line: triple-equals
        seatLabel: (layout.charAt(i) == 'g') ? rowLabel + (i + 1) : '' ,
        seatNo: (i + 1).toString()
      };
      rowSeats.push(obj);
    }
    return rowSeats;
  }

  public prepareFlightLayout(flightLayout: FlightLayout) {
    const totalRows = flightLayout.economyRows + flightLayout.businessRows;
    for (let i = 1; i <= totalRows; i++) {
      const obj = {};
      if (i === 1) {
        obj['seatPricingInformation'] = 'Business Class';
      } else if (i === flightLayout.businessRows + 1) {
        obj['seatPricingInformation'] = 'Economy Class';
      }
      obj['seatRowLabel'] = this.toLetters(i);
      obj['seats'] = this.generateSeats(
        (i > 0 && i <= flightLayout.businessRows) ? flightLayout.businessLayout :
          flightLayout.economyLayout, this.toLetters(i));
      this.seatMap2.push(obj);
    }
  }

  public selectSeat(seatObject: any) {
    if (this.config === 'checkIn' || this.config === 'edit') {
      // tslint:disable-next-line: triple-equals
      if (seatObject.status == this.seatLocalEnumStatus.available) {
        if (this.seatStatus === '') {
          if (this.selectedPassangerData.wheelChair) {
            seatObject.status = this.seatLocalEnumStatus.bookedwithwheel;
          } else if (this.selectedPassangerData.isHavingInfant) {
            seatObject.status = this.seatLocalEnumStatus.bookedwithchild;
          } else {
            seatObject.status = this.seatLocalEnumStatus.booked;
          }
          this.seatStatus = seatObject;
        } else {
          // tslint:disable-next-line: triple-equals
          if (this.seatStatus.key == seatObject.key) {
            this.seatStatus.status = this.seatLocalEnumStatus.available;
            this.seatStatus = '';
          } else {
            this.seatStatus.status = this.seatLocalEnumStatus.available;
            if (this.selectedPassangerData.wheelChair) {
              seatObject.status = this.seatLocalEnumStatus.bookedwithwheel;
            } else if (this.selectedPassangerData.isHavingInfant) {
              seatObject.status = this.seatLocalEnumStatus.bookedwithchild;
            } else {
              seatObject.status = this.seatLocalEnumStatus.booked;
            }
            this.seatStatus = seatObject;
          }
        }
        this.emitSeats.emit(this.seatStatus);
      }
    } else if (this.config === 'checkOut' &&
        // tslint:disable-next-line: triple-equals
        seatObject.seatLabel == this.selectedPassangerData.seatNo) {
          seatObject.status = this.seatLocalEnumStatus.marked;
          this.emitSeats.emit(this.seatStatus);
    }
  }

  private toLetters(num): string {
    const mod = num % 26;
    // tslint:disable-next-line: no-bitwise
    let pow = num / 26 | 0;
    const out = mod ? String.fromCharCode(64 + mod) : (pow--, 'Z');
    return pow ? this.toLetters(pow) + out : out;
  }

}
