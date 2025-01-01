import { Action, createReducer, on } from "@ngrx/store";
import * as ParksActions from "../actions";
import { ParkDetailDTO, ParksDTO } from "../models/parks.dto";

export interface ParksState {
    parks: ParksDTO[];
    parkDetail: ParkDetailDTO | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: ParksState = {
    parks: [],
    parkDetail: null,
    loading: false,
    loaded: false,
    error: null,
};

const _parksReducer = createReducer(
    initialState,

    // ***** GET PARKS LIST *****
    on(ParksActions.getParksList, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(ParksActions.getParksListSuccess, (state, action) => ({
        ...state,
        parks: action.parks,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(ParksActions.getParksListFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),

    // ***** GET PARK DETAIL *****
    on(ParksActions.getParkDetail, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(ParksActions.getParkDetailSuccess, (state, action) => ({
        ...state,
        parkDetail: action.park,
        loading: false,
        loaded: true,
        error: null,
    })),
    on(ParksActions.getParkDetailFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),

    // ***** DELETE PARK *****
    on(ParksActions.deletePark, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(ParksActions.deleteParkSuccess, (state, { parkId }) => ({
        ...state,
        parks: state.parks.filter((park) => park.id !== parkId),
        loading: false,
        loaded: true,
        error: null,
    })),
    on(ParksActions.deleteParkFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),
    // ***** ADD PARK *****
    on(ParksActions.addPark, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(ParksActions.addParkSuccess, (state, { park }) => {
        const updatedPark = {
            ...park,
            id: park.id || 0,
            categories: park.categories.map((categoryId) => ({
                id: categoryId,
                name: "",
                created: "",
            })),
        };

        return {
            ...state,
            parks: [...state.parks, updatedPark],
            loading: false,
            loaded: true,
            error: null,
        };
    }),
    on(ParksActions.addParkFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    })),

    // ***** UPDATE PARK *****
    on(ParksActions.updatePark, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null,
    })),
    on(ParksActions.updateParkSuccess, (state, { parkId, park }) => {
        const updatedPark = {
            ...park,
            categories: park.categories.map((categoryId) => ({
                id: categoryId,
                name: "",
                created: "",
            })),
        };

        return {
            ...state,
            parks: state.parks.map((p) => (p.id === parseInt(parkId, 10) ? { ...p, ...updatedPark } : p)),
            loading: false,
            loaded: true,
            error: null,
        };
    }),

    on(ParksActions.updateParkFailure, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: { payload },
    }))
);

export function parksReducer(state: ParksState | undefined, action: Action): ParksState {
    return _parksReducer(state, action);
}
