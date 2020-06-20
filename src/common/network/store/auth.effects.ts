import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';

import { Role, User } from 'src/common/models/user.model';
import { AuthService } from '../services/auth.service';

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

const API_KEY = 'AIzaSyAWJxgcaFTun485CNpLuocHvte8rtbh4DE';

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  role: Role,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, role, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    // tslint:disable-next-line: object-literal-shorthand
    email: email,
    // tslint:disable-next-line: object-literal-shorthand
    userId: userId,
    // tslint:disable-next-line: object-literal-shorthand
    role: role,
    // tslint:disable-next-line: object-literal-shorthand
    token: token,
    // tslint:disable-next-line: object-literal-shorthand
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  public readonly admin: string = 'admin@gmail.com';

  @Effect()
  public authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            if (resData.email === this.admin) {
              resData.role = Role.ADMIN_USER;
            } else {
              resData.role = Role.AIRLINE_USER;
            }
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.role,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  public authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            if (resData.email === this.admin) {
              resData.role = Role.ADMIN_USER;
            } else {
              resData.role = Role.AIRLINE_USER;
            }
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.role,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  public autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        role: Role;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData.role,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          role: loadedUser.role,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  public authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((resData: AuthActions.AuthenticateSuccess) => {
      if (resData.payload.redirect) {
        this.router.navigate([resData.payload.role]);
      }
    })
  );

  @Effect({ dispatch: false })
  public authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
