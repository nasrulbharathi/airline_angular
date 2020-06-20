import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TableComponent } from './table/table.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { PassengerDataService } from '../services/passenger-data.service';
import { CrudOperationService } from '../services/crud-operation.service';
import { CreateModifyPassangerDialogComponent } from './dialogs/create-modify-passanger/create-modify-passanger.dialog.component';
import { CreateModifyAncillaryDialogComponent } from './dialogs/create-modify-ancillary/create-modify-ancillary.dialog.component';
import { DualListComponent } from './dual-list/dual-list.component';
import { SeatMapComponent } from './seat-map/seat-map.component';
import { CheckInCheckOutDialogComponent } from './dialogs/checkin-checkout/checkin-checkout.dialog.component';
import { ModifyPassangerInFlightDialogComponent } from './dialogs/modify-passanger-inflight/modify-passanger-inflight.dialog.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    TableComponent,
    DeleteDialogComponent,
    CreateModifyPassangerDialogComponent,
    CreateModifyAncillaryDialogComponent,
    CheckInCheckOutDialogComponent,
    ModifyPassangerInFlightDialogComponent,
    DualListComponent,
    SeatMapComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    AngularDualListBoxModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    TableComponent,
    DualListComponent,
    DeleteDialogComponent,
    SeatMapComponent,
    CreateModifyPassangerDialogComponent,
    CreateModifyAncillaryDialogComponent,
    CheckInCheckOutDialogComponent,
    ModifyPassangerInFlightDialogComponent,
    LoadingSpinnerComponent
  ],
  entryComponents: [
    CreateModifyPassangerDialogComponent,
    CreateModifyAncillaryDialogComponent,
    CheckInCheckOutDialogComponent,
    ModifyPassangerInFlightDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    PassengerDataService,
    CrudOperationService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WidgetsModule { }
