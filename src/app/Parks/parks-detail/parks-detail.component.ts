import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as ParksActions from "../actions";
import { ParkDetailDTO } from "../models/parks.dto";
import { ParksState } from "../reducers/parks.reducer";

@Component({
    selector: "app-parks-detail",
    templateUrl: "./parks-detail.component.html",
    styleUrls: ["./parks-detail.component.scss"],
})
export class ParksDetailComponent implements OnInit {
    parkId!: string;
    parkDetail$!: Observable<ParkDetailDTO | null>;

    constructor(private store: Store<ParksState>, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.parkId = params.get("id")!;
            this.loadParkDetail();

            this.parkDetail$ = this.store.select((state: any) => state.parks.parkDetail);
        });
    }

    private loadParkDetail(): void {
        this.store.dispatch(ParksActions.getParkDetail({ parkId: this.parkId }));
    }
}
