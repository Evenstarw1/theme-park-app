import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { SharedService } from "src/app/Shared/Services/shared.service";
import * as ParksActions from "../actions";
import { ParkDetailDTO, ParksDTO } from "../models/parks.dto";
import { ParksService } from "../services/parks.service";

@Injectable()
export class ParksEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(private actions$: Actions, private parksService: ParksService, private router: Router, private sharedService: SharedService) {
        this.responseOK = false;
    }

    getParksList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ParksActions.getParksList),
            exhaustMap(() =>
                this.parksService.getParksList().pipe(
                    map((parks: ParksDTO[]) => {
                        return ParksActions.getParksListSuccess({ parks });
                    }),
                    catchError((error) => {
                        this.sharedService.managementSnackBar("Error", false);
                        return of(ParksActions.getParksListFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getParksListSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ParksActions.getParksListSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    getParksListFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ParksActions.getParksListFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getParkDetail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ParksActions.getParkDetail),
            exhaustMap((action) =>
                this.parksService.getParkDetail(action.parkId).pipe(
                    map((park: ParkDetailDTO) => {
                        return ParksActions.getParkDetailSuccess({ park });
                    }),
                    catchError((error) => {
                        this.sharedService.managementSnackBar("Error", false);
                        return of(ParksActions.getParkDetailFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getParkDetailSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ParksActions.getParkDetailSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    getParkDetailFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ParksActions.getParkDetailFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    addParkComment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ParksActions.addParkComment),
            exhaustMap((action) =>
                this.parksService.addParkComment(action.parkId, action.comment).pipe(
                    map(() => {
                        this.sharedService.managementSnackBar("Comentario agregado exitosamente", true);
                        return ParksActions.addParkCommentSuccess({ parkId: action.parkId, comment: action.comment });
                    }),
                    catchError((error) => {
                        this.sharedService.managementSnackBar("Error al agregar el comentario", false);
                        return of(ParksActions.addParkCommentFailure({ payload: error }));
                    })
                )
            )
        )
    );
}
