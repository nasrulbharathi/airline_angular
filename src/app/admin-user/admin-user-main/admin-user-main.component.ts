import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Role } from 'src/common/models/user.model';

import { AuthService } from 'src/common/network/services/auth.service';
import { AdminUserMainConfigService } from './admin-user-main-config.service';

import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'ar-admin-user-main',
  templateUrl: './admin-user-main.component.html',
  styleUrls: ['./admin-user-main.component.css'],
  providers: [AdminUserMainConfigService]
})
export class AdminUserMainComponent implements OnInit, OnDestroy {

  public role: Role;
  public iconValue = {
    name: this.adminUserMainConfigService.adminItems[0].name,
    icon: this.adminUserMainConfigService.adminItems[0].icon
  };
  private userSub: Subscription;

  constructor(public adminUserMainConfigService: AdminUserMainConfigService,
              private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  public ngOnInit(): void {
    this.userSub = this.store.select('auth')
                  .pipe(map(authState => authState.user))
                  .subscribe(user => {
                    if (user && user.role != null) {
                      this.role = user.role;
                    } else {
                      this.role = this.authService.getUserData().role;
                    }
                  });
    this.router.navigate(['admin/passenger']);
  }

  public emitIconValue(iconValue: any): void {
    this.iconValue = iconValue;
  }

  public ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
