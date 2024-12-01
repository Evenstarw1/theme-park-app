import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Auth/effects/auth.effects';
import { UserEffects } from './User/effects';
import * as AuthReducer from './Auth/reducers';
import * as UserReducer from './User/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserReducer.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: UserReducer.userReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects
];
