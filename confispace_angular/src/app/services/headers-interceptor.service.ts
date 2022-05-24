import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeadersInterceptorService {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get("skipHeaders")) return next.handle(req);
    let headers = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
      },
    });
    return next.handle(headers);
  }
}
