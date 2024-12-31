import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CategoryDTO } from "src/app/Shared/Models/categories.dto";
import { SharedService } from "src/app/Shared/Services/shared.service";

@Injectable({
    providedIn: "root",
})
export class CategoriesService {
    private urlParkFinderApi: string;

    constructor(private http: HttpClient, private sharedService: SharedService) {
        this.urlParkFinderApi = "/api/";
    }

    getCategories(): Observable<CategoryDTO[]> {
        return this.http.get<CategoryDTO[]>(this.urlParkFinderApi + "pub/getCategories").pipe(catchError(this.sharedService.handleError));
    }

    addCategories(category: CategoryDTO): Observable<CategoryDTO> {
        return this.http.post<CategoryDTO>(this.urlParkFinderApi + "priv/categories", category).pipe(catchError(this.sharedService.handleError));
    }
}
