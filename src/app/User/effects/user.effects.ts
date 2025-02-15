import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, finalize, map } from "rxjs/operators";
import { SharedService } from "src/app/Shared/Services/shared.service";
import * as UserActions from "../actions";
import { UserDTO } from "../models/user.dto";
import { UserService } from "../services/user.service";

@Injectable()
export class UserEffects {
    private responseOK: boolean;
    private errorResponse: any;

    constructor(private actions$: Actions, private userService: UserService, private router: Router, private sharedService: SharedService) {
        this.responseOK = false;
    }

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.register),
            exhaustMap(({ user }) =>
                this.userService.register(user).pipe(
                    map((user) => {
                        this.sharedService.managementSnackBar("Registro exitoso", true);
                        return UserActions.registerSuccess({ user: user });
                    }),
                    catchError((error) => {
                        this.sharedService.managementSnackBar("Error en el registro", false);
                        return of(UserActions.registerFailure({ payload: error }));
                    }),
                    finalize(() => {
                        if (this.responseOK) {
                            this.router.navigateByUrl("home");
                        }
                    })
                )
            )
        )
    );

    registerSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.registerSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    registerFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.registerFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            exhaustMap(({ userId, user }) =>
                this.userService.updateUser(userId, user).pipe(
                    map((user) => {
                        this.sharedService.managementSnackBar("Perfil actualizado con éxito", true);
                        return UserActions.updateUserSuccess({
                            userId: userId,
                            user: user,
                        });
                    }),
                    catchError((error) => {
                        this.sharedService.managementSnackBar("Error al actualizar el perfil", false);
                        return of(UserActions.updateUserFailure({ payload: error }));
                    }),
                    finalize(() => {
                        if (this.responseOK) {
                            this.router.navigateByUrl("user/profile");
                        }
                    })
                )
            )
        )
    );

    updateUserSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.updateUserSuccess),
                map(() => {
                    this.responseOK = true;
                })
            ),
        { dispatch: false }
    );

    updateUserFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.updateUserFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );

    getUserById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getUserById),
            exhaustMap(({ userId }) =>
                this.userService.getUserById(userId).pipe(
                    map((user) => {
                        return UserActions.getUserByIdSuccess({
                            userId: userId,
                            user: user,
                        });
                    }),
                    catchError((error) => {
                        return of(UserActions.getUserByIdFailure({ payload: error }));
                    })
                )
            )
        )
    );

    getUserByIdFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(UserActions.getUserByIdFailure),
                map((error) => {
                    this.responseOK = false;
                    this.errorResponse = error.payload.error;
                    this.sharedService.errorLog(error.payload.error);
                })
            ),
        { dispatch: false }
    );
    getAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getAllUsers),
            exhaustMap(() =>
                this.userService.getAllUsers().pipe(
                    map((users: UserDTO[]) => UserActions.getAllUsersSuccess({ users })),
                    catchError((error) => of(UserActions.getAllUsersFailure({ payload: error })))
                )
            )
        )
    );
}
