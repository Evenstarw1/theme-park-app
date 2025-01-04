import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as ParksActions from "src/app/Parks/actions";
import { ParksDTO } from "src/app/Parks/models/parks.dto";
import { ParksState } from "src/app/Parks/reducers/parks.reducer";

@Component({
    selector: "app-admin-parks",
    templateUrl: "./admin-parks.component.html",
    styleUrls: ["./admin-parks.component.scss"],
})
export class AdminParksComponent implements OnInit {
    parks$: Observable<ParksDTO[]>;

    displayedColumns: string[] = ["id", "name", "actions"];

    constructor(private store: Store<ParksState>, private router: Router) {
        const selectParksList = createSelector(
            (state: any) => state.parks,
            (state: ParksState) => {
                return state.parks.slice().sort((a, b) => a.id - b.id);
            }
        );

        this.parks$ = this.store.select(selectParksList);
    }

    ngOnInit(): void {
        this.loadParks();
    }

    loadParks(): void {
        this.store.dispatch(ParksActions.getParksList());
    }

    createPark(): void {
        this.router.navigateByUrl("admin/park-form/");
    }

    updatePark(parkId: string): void {
        this.router.navigateByUrl(`admin/park-form/${parkId}`);
    }

    deletePark(parkId: string): void {
        this.store.dispatch(ParksActions.deletePark({ parkId }));
    }

    backToAdmin(): void {
        this.router.navigate(["admin/home"]);
    }
}
