import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { MatDialog } from '@angular/material';

import { Passenger } from 'src/common/models/passanger.model';

import { PassengerDataService } from 'src/common/services/passenger-data.service';
import { CrudOperationService } from 'src/common/services/crud-operation.service';
import { AdminPassengerConfigService } from './admin-passenger-config.service';

import { DeleteDialogComponent } from 'src/common/widgets/dialogs/delete/delete.dialog.component';
import { TableComponent } from 'src/common/widgets/table/table.component';
import { CreateModifyPassangerDialogComponent } from 'src/common/widgets/dialogs/create-modify-passanger/create-modify-passanger.dialog.component';

@Component({
  selector: 'ar-admin-passenger',
  templateUrl: './admin-passenger.component.html',
  styleUrls: ['./admin-passenger.component.css'],
  providers: [AdminPassengerConfigService]
})
export class AdminPassengerComponent implements OnInit, OnDestroy {

  @ViewChild(TableComponent, {static : true})
  public tableReference: TableComponent;

  public tableData: Passenger[];
  public formData: Passenger;
  public isAdd = false;

  private subscription: Subscription;

  constructor(public dialog: MatDialog,
              public adminPassengerConfigService: AdminPassengerConfigService,
              private crudOperationService: CrudOperationService,
              private passengerDataService: PassengerDataService) { }

  public ngOnInit(): void {
    this.subscription = this.passengerDataService.getPassangerData().subscribe(
      message => {
        this.tableData = message;
        this.tableReference.refreshTable(this.tableData);
      });
  }

  public performCrudAction(obj): void {
    switch (obj.action) {
      case 'add' :
        this.addPassengarData();
        break;
      case 'edit':
        this.updatePassengarData(obj.index, obj.rowData);
        break;
      case 'delete':
        this.deletePassengarData(obj.rowData);
        break;
      default: break;
    }

  }

  public ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  private addPassengarData(): void {
    this.formData = { name: '', passportNumber: '', address: '', dateOfBirth: ''};
    const dialogRef = this.dialog.open(CreateModifyPassangerDialogComponent, {
      data: { formData: this.formData, config: 'add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.tableData = this.crudOperationService.addData(this.tableData, result);
        this.passengerDataService.setPassengerData(this.tableData);
      }
    });
  }

  private updatePassengarData(index: number, rowData: Passenger): void {
    const dialogRef = this.dialog.open(CreateModifyPassangerDialogComponent, {
      data: { formData: rowData, config: 'edit' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.tableData = this.crudOperationService.editData(this.tableData, result, index);
        this.passengerDataService.setPassengerData(this.tableData);
      }
    });
  }

  private deletePassengarData(rowData: Passenger): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.tableData = this.crudOperationService.deleteData(this.tableData, rowData);
        this.passengerDataService.setPassengerData(this.tableData);
      }
    });
  }

}
