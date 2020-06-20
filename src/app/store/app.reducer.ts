import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from 'src/common/network/store/auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};
