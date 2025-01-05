import { Component, HostListener, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { DialogComponent } from "src/app/Shared/Components/dialog/dialog.component";
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
    mapWidth: number = 500;
    mapHeight: number = 500;

    constructor(private store: Store<ParksState>, private route: ActivatedRoute, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.parkId = params.get("id")!;
            this.loadParkDetail();

            this.parkDetail$ = this.store.select((state: any) => state.parks.parkDetail);
        });
        this.updateMapSize();
    }

    @HostListener("window:resize", ["$event"])
    onResize(): void {
        this.updateMapSize();
    }

    private updateMapSize(): void {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 480) {
            this.mapWidth = 350;
            this.mapHeight = 350;
        } else if (screenWidth <= 820) {
            this.mapWidth = 700;
            this.mapHeight = 400;
        } else {
            this.mapWidth = 600;
            this.mapHeight = 400;
        }
    }

    private loadParkDetail(): void {
        this.store.dispatch(ParksActions.getParkDetail({ parkId: this.parkId }));
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: "450px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.store.dispatch(ParksActions.addParkComment({ parkId: this.parkId, comment: result }));
            }
        });
    }
}
