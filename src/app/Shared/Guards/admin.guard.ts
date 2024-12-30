import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppState } from "src/app/app.reducers";

@Injectable({
    providedIn: "root",
})
export class AdminGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store
            .select((state) => state.user.user)
            .pipe(
                map((user) => {
                    if (user && user.access_level === 1) {
                        return true;
                    }
                    this.router.navigate(["/home"]);
                    return false;
                })
            );
    }
}
