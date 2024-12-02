import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { Category } from 'src/app/Shared/Models/categories.dto';

@Injectable({
  providedIn: 'root'
})


export class CategoriesService {
  private urlParkFinderApi: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urlParkFinderApi = '/api/';
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.urlParkFinderApi + 'pub/getCategories')
      .pipe(catchError(this.sharedService.handleError));
  }
}
