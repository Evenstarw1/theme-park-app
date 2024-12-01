import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface ResponseError {
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loading$!: ReplaySubject<boolean>;

  constructor(private snackBar: MatSnackBar) {
    this.loading$ = new ReplaySubject<boolean>(1);
  }

  managementSnackBar(
    message: string,
    isSuccess: boolean = true
  ): void {
    const panelClass = isSuccess ? 'snack-bar-success' : 'snack-bar-error';
    this.snackBar.open(message, 'Cerrar', {
      duration: 6000,
      panelClass: [panelClass],
    });
  }
  errorLog(error: ResponseError): void {
    console.error('statusCode:', error.statusCode);
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoading(loading: boolean) {
    this.loading$.next(loading);
  }
}
