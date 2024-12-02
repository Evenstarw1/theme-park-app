import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AuthDTO } from '../models/auth.dto';

export interface AuthToken {
  user_id: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlParkFinderApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'pub/login';
    this.urlParkFinderApi = '/api/' + this.controller; 
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.urlParkFinderApi, auth)
      .pipe(catchError(this.sharedService.handleError));
  }
}
