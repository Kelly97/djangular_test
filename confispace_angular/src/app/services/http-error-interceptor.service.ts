import { Injectable, Injector } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LocalstorageService } from "./localstorage.service";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private storage: LocalstorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        switch (error?.status) {
          case 401:
            this.storage.logOut();
            break;
          case 403:
            this.router.navigate(["/"]);
            break;
          case 500:
            this.router.navigate(["/error-500"]);
            break;
          default:
            break;
        }
        this.snackbar.open(this.setError(error), "Cerrar", {
          duration: 10000,
        });
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
      errorMsg = error.error.detail || "Lo sentimos. Ocurrió un error.";
    }
    return errorMsg;
  }
}
