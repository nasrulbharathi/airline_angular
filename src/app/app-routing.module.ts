import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/common/network/services/auth.guard';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  },
  {
    path: 'admin',
    loadChildren: './admin-user/admin-user.module#AdminUserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'airlineuser',
    loadChildren: './airline-user/airline-user.module#AirlineUserModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
