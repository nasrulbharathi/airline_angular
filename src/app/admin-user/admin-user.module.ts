import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import { WidgetsModule } from 'src/common/widgets/widgets.module';

import { AdminPassengerComponent } from './admin-passenger/admin-passenger.component';
import { AncillaryMaintenanceComponent } from './ancillary-maintenance/ancillary-maintenance.component';
import { FlightAncillaryMgtComponent } from './flight-ancillary-mgt/flight-ancillary-mgt.component';
import { AdminUserMainComponent } from './admin-user-main/admin-user-main.component';

@NgModule({
  declarations: [
      AdminPassengerComponent,
      AncillaryMaintenanceComponent,
      FlightAncillaryMgtComponent,
      AdminUserMainComponent
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    AdminUserRoutingModule,
    MatTableModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminUserModule { }
