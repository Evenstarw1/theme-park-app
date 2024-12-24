import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ParksDTO } from "../models/parks.dto";

export const getParksList = createAction("[ParksList Page] Get parks list");

export const getParksListSuccess = createAction("[ParksList Page] Get parks list Success", props<{ parks: ParksDTO[] }>());

export const getParksListFailure = createAction("[ParksList Page] Get parks list Failure", props<{ payload: HttpErrorResponse }>());
