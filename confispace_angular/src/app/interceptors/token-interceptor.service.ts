import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.storageService.getToken();
    let headers = req.clone();
    if (token) {
      headers = req.clone({
        setHeaders: { Authorization: `Token ${token}` },
      });
    }
    return next.handle(headers);
  }
}
