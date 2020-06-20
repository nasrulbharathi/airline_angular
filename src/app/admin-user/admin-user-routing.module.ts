import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserMainComponent } from './admin-user-main/admin-user-main.component';
import { AdminPassengerComponent } from './admin-passenger/admin-passenger.component';
import { FlightAncillaryMgtComponent } from './flight-ancillary-mgt/flight-ancillary-mgt.component';
import { AncillaryMaintenanceComponent } from './ancillary-maintenance/ancillary-maintenance.component';

const routes: Routes = [
  {
      path: '',
      component: AdminUserMainComponent,
      children: [
          {
            path: 'passenger',
            component: AdminPassengerComponent
          },
          {
            path: 'flightancillary',
            component: FlightAncillaryMgtComponent
          },
          {
            path: 'ancillarymaintanence',
            component: AncillaryMaintenanceComponent
          }
      ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminUserRoutingModule { }
