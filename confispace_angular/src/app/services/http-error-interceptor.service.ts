import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { NotifyService } from "../components/services/notify.service";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private storage: StorageService,
    private notifyService: NotifyService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error?.status) {
          case 401:
            this.storage.logOut();
            break;
          case 403:
            this.router.navigate(["/error-403"]);
            break;
          case 500:
            this.router.navigate(["/error-500"]);
            break;
          default:
            break;
        }
        this.notifyService.show({ msg: this.setError(error) });
        return throwError(error.error);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMsg = "Ocurrió un error.";
    if (error.error instanceof ErrorEvent) {
      //client error
      errorMsg = error.error.message;
    } else {
      //server error
      errorMsg = error.error.detail || error.error.non_field_errors || "Lo sentimos. Ocurrió un error.";
    }
    return errorMsg;
  }
}
