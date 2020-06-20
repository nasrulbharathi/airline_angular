import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AirlineUserMainComponent } from './airline-user-main/airline-user-main.component';
import { UserCheckinComponent } from './user-checkin/user-checkin.component';
import { InFlightComponent } from './in-flight/in-flight.component';

const routes: Routes = [
  {
      path: '',
      component: AirlineUserMainComponent,
      children: [
          {
            path: 'checkin',
            component: UserCheckinComponent
          },
          {
            path: 'inflight',
            component: InFlightComponent
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
export class AirlineUserRoutingModule { }
