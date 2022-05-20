import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let storageService = this.inject.get(LocalstorageService);
    const token = storageService.getToken();
    let headers = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
    if (token) {
      headers = headers.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
    }

    return next.handle(headers);
  }
}
