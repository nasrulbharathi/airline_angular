import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ancillary } from 'src/common/models/ancillary.model';
import { Flight } from 'src/common/models/flight.model';

import { AncillaryDataService } from 'src/common/services/ancillary-data.service';
import { FlightDataService } from 'src/common/services/flight-data.service';
import { CrudOperationService } from 'src/common/services/crud-operation.service';

@Component({
  selector: 'ar-flight-ancillary-mgt',
  templateUrl: './flight-ancillary-mgt.component.html',
  styleUrls: ['./flight-ancillary-mgt.component.scss']
})
export class FlightAncillaryMgtComponent implements OnInit, OnDestroy {

  public isMeal: boolean;
  public isAncillaryItem: boolean;
  public isShoppingItem: boolean;
  public flights: string[] = [];
  public dualListAncillarySource: string[] = [];
  public dualListAncillaryDestination: string[] = [];
  public dualListShoppingSource: string[] = [];
  public dualListShoppingDestination: string[] = [];
  public dualListMealSource: string[] = [];
  public dualListMealDestination: string[] = [];
  public ancillaryData: Ancillary[];
  public flightData: Flight[];

  private ancillaryFinalData: string[] = [];
  private shoppingData: string[] = [];
  private mealData: string[] = [];
  private selectedFlightData: Flight;
  private selectedFlightIndex: number;
  private subscription1: Subscription;
  private subscription2: Subscription;

  constructor(private ancillaryDataService: AncillaryDataService,
              private flightDataService: FlightDataService,
              private crudOperationService: CrudOperationService) { }

  public ngOnInit(): void {
    this.subscription2 = this.ancillaryDataService.getAncillaryData().subscribe(
      (ancData: Ancillary[]) => {
        this.ancillaryData = ancData;
        this.subscription1 = this.flightDataService.getFlightData().subscribe(
          (flightData: Flight[]) => {
            this.flightData = flightData;
            this.settingFlightComboBox(this.flightData);
          });
      });
  }

  public ngOnDestroy(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  public onSubmit(): void {
    this.selectedFlightData.meals = this.mealData;
    this.selectedFlightData.ancillaryService = this.ancillaryFinalData;
    this.selectedFlightData.shoppingItems = this.shoppingData;
    this.flightDataService.setFlightData(this.crudOperationService.
      editData(this.flightData, this.selectedFlightData, this.selectedFlightIndex,
          'Ancillary Services for the Flight has been done'));
  }

  public destinationMealData(temp: any): void {
    this.mealData = temp;
  }

  public destinationAncillaryData(temp: any): void {
    this.ancillaryFinalData = temp;

  }

  public destinationShoppingData(temp: any): void {
    this.shoppingData = temp;
  }

  public ancillaryToggle($events): void {
    // tslint:disable-next-line: deprecation
    this.isAncillaryItem = (event.target as HTMLInputElement).checked;
  }

  public mealToggle($events): void {
    // tslint:disable-next-line: deprecation
    this.isMeal = (event.target as HTMLInputElement).checked;
  }

  public shoppingToggle($events): void {
    // tslint:disable-next-line: deprecation
    this.isShoppingItem = (event.target as HTMLInputElement).checked;
  }

  public clearDualListValues(): void {
    this.dualListAncillarySource = [];
    this.dualListAncillaryDestination = [];
    this.dualListShoppingSource = [];
    this.dualListShoppingDestination = [];
    this.dualListMealSource = [];
    this.dualListMealDestination = [];
  }

  public loadAncillaryDetails(selectedFlight: string): void {
    this.clearDualListValues();
    this.flightData.forEach(
       (flight: Flight, index: number) => {
         if (flight.name === selectedFlight) {
            this.selectedFlightData = flight;
            this.selectedFlightIndex = index;
         }
       }
    );

    if (this.selectedFlightData.ancillaryService.length < 1 ) {
      this.isAncillaryItem = false;
      this.ancillaryData.forEach( (obj: Ancillary) => {
        if (obj.type.others) {
          this.dualListAncillarySource.push(obj.name);
        }
      });

    } else {
      this.isAncillaryItem = true;
      this.selectedFlightData.ancillaryService.forEach( (availableAncillary: string) => {
        this.ancillaryData.forEach( (obj: Ancillary) => {
          if (obj.type.others && obj.name === availableAncillary) {
            this.dualListAncillarySource.push(obj.name);
            this.dualListAncillaryDestination.push(obj.name);
          } else if (obj.type.others) {
            this.dualListAncillarySource.push(obj.name);
          }
        });

      });
    }

    if (this.selectedFlightData.shoppingItems.length < 1 ) {
      this.isShoppingItem = false;
      this.ancillaryData.forEach( (obj: Ancillary) => {
        if (obj.type.shoppingItem) {
          this.dualListShoppingSource.push(obj.name);
        }
      });

    } else {
      this.isShoppingItem = true;
      this.selectedFlightData.shoppingItems.forEach( (availableShoppingItem: string) => {
        this.ancillaryData.forEach( (obj: Ancillary) => {
          if (obj.type.shoppingItem && obj.name === availableShoppingItem) {
            this.dualListShoppingSource.push(obj.name);
            this.dualListShoppingDestination.push(obj.name);
          } else if (obj.type.shoppingItem) {
            this.dualListShoppingSource.push(obj.name);
          }
        });

      });
    }

    if (this.selectedFlightData.meals.length < 1 ) {
      this.isMeal = false;
      this.ancillaryData.forEach( (obj: Ancillary) => {
        if (obj.type.specialMeal) {
          this.dualListMealSource.push(obj.name);
        }
      });
    } else {
      this.isMeal = true;
      this.selectedFlightData.meals.forEach( (avalableMeal: string) => {
        this.ancillaryData.forEach( (obj: Ancillary) => {
          if (obj.type.specialMeal && obj.name === avalableMeal) {
            this.dualListMealSource.push(obj.name);
            this.dualListMealDestination.push(obj.name);
          } else if (obj.type.specialMeal) {
            this.dualListMealSource.push(obj.name);
          }
        });

      });
    }
  }

  private settingFlightComboBox(flightData: Flight[]) {
    this.flights = [];
    flightData.forEach( (flight) => {
      this.flights.push(flight.name);
    });
  }
}
