import { Action, createReducer, on } from "@ngrx/store";
import * as UserActions from "../actions";
import { UserDTO } from "../models/user.dto";

export interface UserState {
    user: UserDTO;
    users: UserDTO[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: UserState = {
    user: new UserDTO("", "", "", "", "", "", "", [], 2),
    users: [],
    loading: false,
    loaded: false,
    error: null,
};

const _userReducer = createReducer(
    initialState,
    on(UserActions.register, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.registerSuccess, (state, action) => ({
        ...state,
        user: action.user,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(UserActions.registerFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(UserActions.updateUser, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.updateUserSuccess, (state, action) => ({
        ...state,
        user: action.user,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(UserActions.updateUserFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(UserActions.getUserById, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.getUserByIdSuccess, (state, action) => ({
        ...state,
        user: action.user,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(UserActions.getUserByIdFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(UserActions.getAllUsers, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(UserActions.getAllUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(UserActions.getAllUsersFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload,
    }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
    return _userReducer(state, action);
}
