import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlParkFinderApi: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.urlParkFinderApi = '/api/';
  }

  register(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(this.urlParkFinderApi +'pub/register', user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDTO): Observable<UserDTO> {
    return this.http
      .patch<UserDTO>(this.urlParkFinderApi + 'priv/users/' + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlParkFinderApi + 'priv/users/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
