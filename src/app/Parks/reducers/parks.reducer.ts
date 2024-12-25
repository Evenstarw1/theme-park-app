import { Action, createReducer, on } from "@ngrx/store";
import { getParkDetail, getParkDetailFailure, getParkDetailSuccess, getParksList, getParksListFailure, getParksListSuccess } from "../actions";
import { ParkDetailDTO, ParksDTO } from "../models/parks.dto";

export interface ParksState {
    parks: ParksDTO[];
    parkDetail: ParkDetailDTO | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: ParksState = {
    parks: new Array<ParksDTO>(),
    parkDetail: null,
    loading: false,
    loaded: false,
    error: null,
};

const _parksReducer = createReducer(
    initialState,
    on(getParksList, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getParksListSuccess, (state, action) => ({
        ...state,
        parks: action.parks,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getParksListFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    on(getParkDetail, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(getParkDetailSuccess, (state, action) => ({
        ...state,
        parkDetail: action.park,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(getParkDetailFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    }))
);

export function parksReducer(state: ParksState | undefined, action: Action): ParksState {
    return _parksReducer(state, action);
}
