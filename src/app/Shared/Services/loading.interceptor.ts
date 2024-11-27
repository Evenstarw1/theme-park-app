import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.sharedService.setLoading(true);

    return next.handle(req).pipe(
      finalize(() => {
        this.sharedService.setLoading(false);
      })
    );
  }
}
