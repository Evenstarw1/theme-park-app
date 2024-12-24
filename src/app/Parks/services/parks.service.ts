import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SharedService } from "src/app/Shared/Services/shared.service";
import { ParksDTO } from "../models/parks.dto";

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
}
