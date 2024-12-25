import { Component, OnInit } from "@angular/core";
import { createSelector, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as ParksActions from "../actions";
import { ParksDTO } from "../models/parks.dto";
import { ParksState } from "../reducers/parks.reducer";

@Component({
    selector: "app-parks-list",
    templateUrl: "./parks-list.component.html",
    styleUrls: ["./parks-list.component.scss"],
})
export class ParksListComponent implements OnInit {
    parks$: Observable<ParksDTO[]>;

    constructor(private store: Store<ParksState>) {
        const selectParksList = createSelector(
            (state: any) => state.parks,
            (state: ParksState) => state.parks
        );

        this.parks$ = this.store.select(selectParksList);
    }

    ngOnInit(): void {
        this.loadParks();
    }

    private loadParks(): void {
        this.store.dispatch(ParksActions.getParksList());
    }
}
