import { ActionReducerMap } from "@ngrx/store";
import { AuthEffects } from "./Auth/effects/auth.effects";
import * as AuthReducer from "./Auth/reducers";
import { ParksEffects } from "./Parks/effects";
import * as ParksReducer from "./Parks/reducers";
import { UserEffects } from "./User/effects";
import * as UserReducer from "./User/reducers";

export interface AppState {
    auth: AuthReducer.AuthState;
    user: UserReducer.UserState;
    parks: ParksReducer.ParksState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: AuthReducer.authReducer,
    user: UserReducer.userReducer,
    parks: ParksReducer.parksReducer,
};

export const EffectsArray: any[] = [AuthEffects, UserEffects, ParksEffects];
