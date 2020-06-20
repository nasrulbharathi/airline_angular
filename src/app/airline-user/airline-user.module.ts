import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { WidgetsModule } from 'src/common/widgets/widgets.module';
import { AirlineUserRoutingModule } from './airline-user-routing.module';

import { AirlineUserMainComponent } from './airline-user-main/airline-user-main.component';
import { UserCheckinComponent } from './user-checkin/user-checkin.component';
import { InFlightComponent } from './in-flight/in-flight.component';

@NgModule({
  declarations: [AirlineUserMainComponent, UserCheckinComponent, InFlightComponent],
  imports: [
    CommonModule,
    WidgetsModule,
    MatSelectModule,
    AirlineUserRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatCardModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AirlineUserModule { }
