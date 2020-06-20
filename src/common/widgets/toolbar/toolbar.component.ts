import { Component, EventEmitter, Output, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AuthActions from 'src/common/network/store/auth.actions';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'ar-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input()
  public title = 'Airline Services';

  @Input()
  public isLogged = true;

  @Output()
  public emitSideNavAction = new EventEmitter<void>();

  constructor(private store: Store<fromApp.AppState>) {
  }

  public emitSideNavEvent(): void {
    this.emitSideNavAction.emit();
  }

  public logOut(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

}
