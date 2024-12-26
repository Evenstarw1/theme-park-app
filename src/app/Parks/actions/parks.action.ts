import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ParkDetailDTO, ParksDTO } from "../models/parks.dto";

export const getParksList = createAction("[ParksList Page] Get parks list");

export const getParksListSuccess = createAction("[ParksList Page] Get parks list Success", props<{ parks: ParksDTO[] }>());

export const getParksListFailure = createAction("[ParksList Page] Get parks list Failure", props<{ payload: HttpErrorResponse }>());

export const getParkDetail = createAction("[ParkDetail Page] Get park detail", props<{ parkId: string }>());

export const getParkDetailSuccess = createAction("[ParkDetail Page] Get park detail Success", props<{ park: ParkDetailDTO }>());

export const getParkDetailFailure = createAction("[ParkDetail Page] Get park detail Failure", props<{ payload: HttpErrorResponse }>());

export const addParkComment = createAction("[ParkDetail Page] Add park comment", props<{ parkId: string; comment: string }>());

export const addParkCommentSuccess = createAction("[ParkDetail Page] Add park comment Success", props<{ parkId: string; comment: string }>());

export const addParkCommentFailure = createAction("[ParkDetail Page] Add park comment Failure", props<{ payload: HttpErrorResponse }>());
