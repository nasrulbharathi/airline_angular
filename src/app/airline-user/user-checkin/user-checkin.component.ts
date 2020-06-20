import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material';

import { Passenger } from 'src/common/models/passanger.model';
import { Flight } from 'src/common/models/flight.model';

import { CrudOperationService } from 'src/common/services/crud-operation.service';
import { FlightDataService } from 'src/common/services/flight-data.service';
import { PassengerDataService } from 'src/common/services/passenger-data.service';
import { UserCheckInConfigService } from './user-checkin-config.service';

import { TableComponent } from 'src/common/widgets/table/table.component';
import { CheckInCheckOutDialogComponent } from 'src/common/widgets/dialogs/checkin-checkout/checkin-checkout.dialog.component';

@Component({
  selector: 'ar-user-checkin',
  templateUrl: './user-checkin.component.html',
  styleUrls: ['./user-checkin.component.css'],
  providers: [UserCheckInConfigService]
})
export class UserCheckinComponent implements OnInit, OnDestroy {

  @ViewChild(TableComponent, {static : true})
  public tableReference: TableComponent;

  public isAdd = false;
  public tableData: Passenger[];
  public flightData: Flight[];
  public flights: string[] = [];
  public selectedPassangerData: Passenger;

  private formData: any;
  private subscription: Subscription;

  constructor(public dialog: MatDialog,
              public userCheckInConfigService: UserCheckInConfigService,
              private crudOperationService: CrudOperationService,
              private passengerDataService: PassengerDataService,
              private flightDataService: FlightDataService) { }

  public ngOnInit(): void {
    this.subscription = this.flightDataService.getFlightData().subscribe(
      message => {
        this.flightData = message;
        this.setFlights(this.flightData);
      });
  }

  public performCrudAction(obj): void {
    switch (obj.action) {
      case 'checkIn' :
        this.checkIn(obj.rowData, obj.index);
        break;
      case 'checkOut' :
        this.checkOut(obj.rowData, obj.index);
        break;
      case 'edit':
        this.editSeat(obj.rowData, obj.index);
        break;
      default: break;
    }
  }

  public checkOut(passangerData: Passenger, index: number): void {
    this.selectedPassangerData = passangerData;
    this.formData = {
      selectedPassangerData: this.selectedPassangerData,
      passangerDataofFlight: this.tableData,
      flightName: this.selectedPassangerData.flightName
    };
    const dialogRef = this.dialog.open(CheckInCheckOutDialogComponent, {
      data: { formData: this.formData, config: 'checkOut'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedPassangerData.seatNo = result.seatLabel;
        this.selectedPassangerData.isCheckedIn = false;
        this.tableData = this.crudOperationService.editData(this.tableData, this.selectedPassangerData, index,
                'The Passanger ' + this.selectedPassangerData.name + ' has been checked Out');
        this.passengerDataService.setPassangerDataPerFlight(this.tableData, this.selectedPassangerData.flightName);
      }
    });
  }

  public editSeat(passangerData: Passenger, index: number): void {
    this.selectedPassangerData = passangerData;
    this.formData = {
      selectedPassangerData: this.selectedPassangerData,
      passangerDataofFlight: this.tableData,
      flightName: this.selectedPassangerData.flightName
    };
    const dialogRef = this.dialog.open(CheckInCheckOutDialogComponent, {
      data: { formData: this.formData, config: 'edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedPassangerData.seatNo = result.seatLabel;
        this.tableData = this.crudOperationService.editData(this.tableData, this.selectedPassangerData, index,
          'The Passanger ' + this.selectedPassangerData.name + ' seat has been changed');
        this.passengerDataService.setPassangerDataPerFlight(this.tableData, this.selectedPassangerData.flightName);
      }
    });
  }

  public checkIn(passangerData: Passenger, index: number): void {
    this.selectedPassangerData = passangerData;
    this.formData = {
      selectedPassangerData: this.selectedPassangerData,
      passangerDataofFlight: this.tableData,
      flightName: this.selectedPassangerData.flightName
    };
    const dialogRef = this.dialog.open(CheckInCheckOutDialogComponent, {
      data: { formData: this.formData, config: 'checkIn'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.selectedPassangerData.seatNo = result.seatLabel;
        this.selectedPassangerData.isCheckedIn = true;
        this.tableData = this.crudOperationService.editData(this.tableData, this.selectedPassangerData, index,
          'The Passanger ' + this.selectedPassangerData.name + ' has been checked in');
        this.passengerDataService.setPassangerDataPerFlight(this.tableData, this.selectedPassangerData.flightName);
      }
    });
  }

  public loadPassangerDetailsPerFlight(flightName: string): void {
    this.tableData = this.passengerDataService.getPassangerDataPerFlight(flightName);
    this.tableReference.refreshTable(this.tableData);
  }

  public ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  private setFlights(flightData: Flight[]): void {
    this.flightData.forEach((flight: Flight) => {
      this.flights.push(flight.name);
    });
  }
}
