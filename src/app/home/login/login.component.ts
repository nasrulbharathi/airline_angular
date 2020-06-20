import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatSnackBar } from '@angular/material';

import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/common/network/store/auth.actions';

import { AuthService } from 'src/common/network/services/auth.service';

@Component({
  selector: 'ar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public applicationHeading = 'Airline Case Study';
  public isLoginMode = true;
  public error: string = null;
  public isLoading = false;

  private storeSub: Subscription;

  constructor(public authService: AuthService,
              private store: Store<fromApp.AppState>,
              private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.snackBar.open(this.error, 'error');
      }
    });
  }

  public onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.store.dispatch(
        // tslint:disable-next-line: object-literal-shorthand
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
       this.store.dispatch(
        // tslint:disable-next-line: object-literal-shorthand
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }
    form.reset();
  }

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
