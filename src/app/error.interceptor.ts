import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable, tap, finalize } from 'rxjs';

import { Logger } from './logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private readonly _logger: Logger,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let canceled = true;
    
    return next.handle(request)
      .pipe(
        tap({
          error: () => canceled = false,
          complete: () => canceled = false,
        }),
        finalize(() => {
          if (canceled) {
            this._logger.log('[ERROR] request is interrupted', 'error');
          } else {
            this._logger.log('[SUCCESS] request is completed', 'success');
          }
        }),
      );
  }
}