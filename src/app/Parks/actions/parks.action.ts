import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ParkCreateUpdateDTO, ParkDetailDTO, ParksDTO } from "../models/parks.dto";

export const getParksList = createAction("[ParksList Page] Get parks list");

export const getParksListSuccess = createAction("[ParksList Page] Get parks list Success", props<{ parks: ParksDTO[] }>());

export const getParksListFailure = createAction("[ParksList Page] Get parks list Failure", props<{ payload: HttpErrorResponse }>());

export const getParkDetail = createAction("[ParkDetail Page] Get park detail", props<{ parkId: string }>());

export const getParkDetailSuccess = createAction("[ParkDetail Page] Get park detail Success", props<{ park: ParkDetailDTO }>());

export const getParkDetailFailure = createAction("[ParkDetail Page] Get park detail Failure", props<{ payload: HttpErrorResponse }>());

export const addParkComment = createAction("[ParkDetail Page] Add park comment", props<{ parkId: string; comment: string }>());

export const addParkCommentSuccess = createAction("[ParkDetail Page] Add park comment Success", props<{ parkId: string; comment: string }>());

export const addParkCommentFailure = createAction("[ParkDetail Page] Add park comment Failure", props<{ payload: HttpErrorResponse }>());

export const deletePark = createAction("[Admin Parks] Delete Park", props<{ parkId: string }>());

export const deleteParkSuccess = createAction("[Admin Parks] Delete Park Success", props<{ parkId: number }>());

export const deleteParkFailure = createAction("[Admin Parks] Delete Park Failure", props<{ payload: HttpErrorResponse }>());

export const addPark = createAction("[Admin Parks] Add Park", props<{ park: ParkCreateUpdateDTO }>());

export const addParkSuccess = createAction("[Admin Parks] Add Park Success", props<{ park: ParkCreateUpdateDTO }>());

export const addParkFailure = createAction("[Admin Parks] Add Park Failure", props<{ payload: HttpErrorResponse }>());

export const updatePark = createAction("[Admin Parks] Update Park", props<{ parkId: string; park: ParkCreateUpdateDTO }>());

export const updateParkSuccess = createAction("[Admin Parks] Update Park Success", props<{ parkId: string; park: ParkCreateUpdateDTO }>());

export const updateParkFailure = createAction("[Admin Parks] Update Park Failure", props<{ payload: HttpErrorResponse }>());
