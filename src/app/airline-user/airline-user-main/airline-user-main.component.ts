import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';

import { Role } from 'src/common/models/user.model';

import { AuthService } from 'src/common/network/services/auth.service';
import { AirlineUserMainConfigService } from './airline-user-main-config.service';

@Component({
  selector: 'ar-airline-user-main',
  templateUrl: './airline-user-main.component.html',
  styleUrls: ['./airline-user-main.component.css'],
  providers: [AirlineUserMainConfigService]
})
export class AirlineUserMainComponent implements OnInit, OnDestroy {

  public role: Role;
  public iconValue = {
    name: this.airlineUserMainConfigService.sideNavItems[0].name,
    icon: this.airlineUserMainConfigService.sideNavItems[0].icon
  };
  private userSub: Subscription;

  constructor(public airlineUserMainConfigService: AirlineUserMainConfigService,
              private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user))
                        .subscribe(user => {
                          if (user && user.role != null) {
                            this.role = user.role;
                          } else {
                            this.role = this.authService.getUserData().role;
                          }
                        });
    this.router.navigate(['airlineuser/checkin']);
  }

  public emitIconValue(iconValue: any): void {
    this.iconValue = iconValue;
  }

  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
