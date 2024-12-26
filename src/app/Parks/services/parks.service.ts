import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { ParkDetailDTO, ParksDTO } from "../models/parks.dto";

@Injectable({
    providedIn: "root",
})
export class ParksService {
    private urlParkFinderApi: string;

    constructor(private http: HttpClient, private sharedService: SharedService) {
        this.urlParkFinderApi = "/api/";
    }

    getParksList(): Observable<ParksDTO[]> {
        return this.http.get<ParksDTO[]>(this.urlParkFinderApi + "priv/parks").pipe(catchError(this.sharedService.handleError));
    }

    getParkDetail(parkId: string): Observable<ParkDetailDTO> {
        return this.http.get<ParkDetailDTO>(`${this.urlParkFinderApi}priv/park/${parkId}`).pipe(catchError(this.sharedService.handleError));
    }

    addParkComment(parkId: string, comment: string): Observable<any> {
        return this.http
            .post(`${this.urlParkFinderApi}/priv/park/comments`, { themepark_id: Number(parkId), comment })
            .pipe(catchError(this.sharedService.handleError));
    }
}
