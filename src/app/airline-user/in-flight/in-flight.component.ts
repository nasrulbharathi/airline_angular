import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog, MatTabGroup } from '@angular/material';

import { CrudOperationService } from 'src/common/services/crud-operation.service';
import { PassengerDataService } from 'src/common/services/passenger-data.service';
import { FlightDataService } from 'src/common/services/flight-data.service';
import { InFlightConfigService } from './in-flight-config.service';

import { Flight } from 'src/common/models/flight.model';
import { Passenger } from 'src/common/models/passanger.model';

import { TableComponent } from 'src/common/widgets/table/table.component';
// tslint:disable-next-line: import-spacing
import { ModifyPassangerInFlightDialogComponent } from
        'src/common/widgets/dialogs/modify-passanger-inflight/modify-passanger-inflight.dialog.component';

@Component({
  selector: 'ar-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss'],
  providers: [InFlightConfigService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InFlightComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(public dialog: MatDialog,
              public inFlightConfigService: InFlightConfigService,
              private crudOperationService: CrudOperationService,
              private passengerDataService: PassengerDataService,
              private flightDataService: FlightDataService,
              private cdf: ChangeDetectorRef) { }

  @ViewChild('tabGroup', {static : false})
  public tabGroup2: MatTabGroup;

  @ViewChild(TableComponent, {static: true})
  public tableComponent: TableComponent;

  public flightData: Flight[];
  public tableData: Passenger[] = [];
  public selectedPassangerData: Passenger;
  public formData: any = {};
  public flights: string[] = [];
  public selectedFlight: Flight;
  public isFlightSelected = false;
  public isMealDetails = false;
  public isTableDetails = false;
  public displayedFlightColumns = ['contents', 'details'];
  public dataSource: any;

  public ngOnInit(): void {
    this.subscription = this.flightDataService.getFlightData().subscribe(
      message => {
        this.flightData = message;
        this.setFlights();
      });
  }

  public tabChange(event: any): void {
    if (event.index === 2) {
      this.isTableDetails = true;
    } else if (event.index === 1) {
      this.isMealDetails = true;
    } else if (event.index === 0) {
      this.generateTable();
    }
  }

  public performCrudAction(obj: any): void {
    switch (obj.action) {
      case 'edit':
        this.editPassangerDetails(obj.rowData, obj.index);
        break;
      default: break;
    }
  }

  public editPassangerDetails(passangerData: Passenger, index: number): void {
    this.selectedPassangerData = passangerData;
    this.formData = {
      shoppingList: this.selectedFlight.shoppingItems,
      ancillaryServiceList: this.selectedFlight.ancillaryService,
      mealList: this.selectedFlight.meals
    };
    const dialogRef = this.dialog.open(ModifyPassangerInFlightDialogComponent, {
      data: { formData: this.formData, config: 'edit'}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.selectedPassangerData.ancillaryService = result.ancillaryService;
        this.selectedPassangerData.shoppingItems = result.shoppingItems;
        if (result.meals) {
          this.selectedPassangerData.meals = result.meals;
          this.selectedPassangerData.isSpecialMeals = true;
        } else {
          this.selectedPassangerData.meals = '';
          this.selectedPassangerData.isSpecialMeals = false;
        }
        this.tableData = this.crudOperationService.editData(this.tableData, this.selectedPassangerData, index);
        this.passengerDataService.setCheckedInPassangerDataPerFlight(this.tableData, this.selectedFlight.name);
      }
    });
  }

  public loadPassangerDetailsPerFlight(flightName: string): void {
    this.selectedFlight = this.flightData.find((flight: Flight) => {
      return flight.name === flightName;
    });
    this.tableData = [];
    this.tableData = this.passengerDataService.getCheckedInPassangerData(flightName);
    this.isFlightSelected = true;
    this.cdf.detectChanges();
    this.tabGroup2.selectedIndex = 0;
    this.generateTable();
  }

  public isArray(obj: any) {
    return Array.isArray(obj);
 }

  public ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  private generateTable(): void {
    this.dataSource = [
      { contents: 'Flight Name', details: this.selectedFlight.name },
      { contents: 'Total Seats', details: this.selectedFlight.totalSeats },
      { contents: 'Ancillary Services',
        details: (this.selectedFlight.ancillaryService.length === 0) ? 'No Ancillary Services' :
          this.selectedFlight.ancillaryService },
      { contents: 'Meals',
        details: (this.selectedFlight.meals.length === 0) ? 'No Meal Services' :
          this.selectedFlight.meals },
      { contents: 'Shopping Items',
        details: (this.selectedFlight.shoppingItems.length === 0) ? 'There is no shopping Items for the List' :
          this.selectedFlight.shoppingItems }
    ];
  }

  private setFlights(): void {
    this.flightData.forEach((flight: Flight) => {
      this.flights.push(flight.name);
    });
  }
}
