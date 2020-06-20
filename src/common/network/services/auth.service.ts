import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';

import { User, Role } from 'src/common/models/user.model';

const API_KEY = 'AIzaSyAWJxgcaFTun485CNpLuocHvte8rtbh4DE';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  role: Role;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public userData: User;
  public readonly admin: string = 'admin@gmail.com';

  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.AuthState>) {}

  public setLogoutTimer(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  public clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  public getUserData(): User {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    return this.userData;
  }
}
