import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/common/network/store/auth.actions';

@Component({
  selector: 'ar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'airline-case-study';

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
