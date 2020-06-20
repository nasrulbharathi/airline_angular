import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatDialog } from '@angular/material';

import { CrudOperationService } from 'src/common/services/crud-operation.service';
import { AncillaryDataService } from 'src/common/services/ancillary-data.service';
import { Ancillary } from 'src/common/models/ancillary.model';
import { AncillaryConfigService } from './ancillary-maintenance-config.service';

import { TableComponent } from 'src/common/widgets/table/table.component';
import { DeleteDialogComponent } from 'src/common/widgets/dialogs/delete/delete.dialog.component';
import { CreateModifyAncillaryDialogComponent } from 'src/common/widgets/dialogs/create-modify-ancillary/create-modify-ancillary.dialog.component';

@Component({
  selector: 'ar-ancillary-maintenance',
  templateUrl: './ancillary-maintenance.component.html',
  styleUrls: ['./ancillary-maintenance.component.css'],
  providers: [AncillaryConfigService]
})
export class AncillaryMaintenanceComponent implements OnInit, OnDestroy {

    @ViewChild(TableComponent, {static : true})
    public tableReference: TableComponent;

    public isAdd = false;
    public tableData: Ancillary[];
    public formData: Ancillary;

    private subscription: Subscription;

    constructor(public dialog: MatDialog,
                public ancillaryConfigService: AncillaryConfigService,
                private crudOperationService: CrudOperationService,
                private ancillaryDataService: AncillaryDataService) { }

    public ngOnInit(): void {
      this.subscription = this.ancillaryDataService.getAncillaryData().subscribe(
        message => {
          this.tableData = message;
          this.tableReference.refreshTable(this.tableData);
        });
    }

    public performCrudAction(obj): void {
      switch (obj.action) {
        case 'add' :
          this.addAncillaryData();
          break;
        case 'edit':
          this.updateAncillaryData(obj.index, obj.rowData);
          break;
        case 'delete':
          this.deleteAncillaryData(obj.rowData);
          break;
        default: break;
      }

    }

    public ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    private addAncillaryData(): void {
      this.formData = { name: '', description: '', type: {}};
      const dialogRef = this.dialog.open(CreateModifyAncillaryDialogComponent, {
        data: { formData: this.formData, config: 'add'}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.tableData = this.crudOperationService.addData(this.tableData, result);
          this.ancillaryDataService.setAncillaryData(this.tableData);
        }
      });
    }

    private updateAncillaryData(index: number, rowData: Ancillary): void {
      const dialogRef = this.dialog.open(CreateModifyAncillaryDialogComponent, {
        data: { formData: rowData, config: 'edit' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.tableData = this.crudOperationService.editData(this.tableData, result, index);
          this.ancillaryDataService.setAncillaryData(this.tableData);
        }
      });
    }

    private deleteAncillaryData(rowData: Ancillary): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.tableData = this.crudOperationService.deleteData(this.tableData, rowData);
          this.ancillaryDataService.setAncillaryData(this.tableData);
        }
      });
    }
}
