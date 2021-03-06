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
import { NotifyService } from "../components/services/notify.service";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root",
})
export class ErrorNotifierInterceptorService implements HttpInterceptor {
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
        this.notifyService.show({ msg: this.setError(error), type: 'error' });
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
      errorMsg = error.error.detail || error.error.non_field_errors;
      if (!errorMsg) {
        switch (error.status) {
          case 400:
            errorMsg = "No fue posible ejecutar el proceso."
            break;
          default:
            errorMsg = "Lo sentimos. Ocurrió un error."
            break;
        }
      }
    }
    return errorMsg;
  }
}
