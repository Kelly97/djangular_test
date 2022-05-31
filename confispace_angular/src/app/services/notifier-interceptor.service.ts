import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { NotifyService } from "../components/services/notify.service";
import { notifierType } from "../components/notifier/notifier.component";

@Injectable({
  providedIn: "root",
})
export class NotifierInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private storage: StorageService,
    private notifyService: NotifyService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.headers.get("skipNotifier")) {
      req = req.clone({ headers: req.headers.delete('skipNotifier') });
      return next.handle(req);
    }

    return next.handle(req).pipe(
      tap((resp: HttpEvent<any>) => {
        if (resp instanceof HttpResponse && resp.ok) {
          const notification = this.setMessage(req, resp);
          notification.msg && this.notifyService.show(notification);
        }
      }),
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

  setMessage(req: HttpRequest<any>, resp: HttpResponse<any>): notifierType {
    let notification: notifierType = {
      msg: "",
      type: "success"
    };
    if (resp.body?.msg) {
      notification.msg = resp.body?.msg;
      notification.title = resp.body?.title;
      notification.type = resp.body?.type || "success";
    } else {
      switch (req?.method) {
        case 'PUT':
          notification.msg = "Proceso de actualización exitoso.";
          break;
        case 'POST':
          notification.msg = "Proceso de creación exitoso.";
          break;
        case 'DELETE':
          notification.msg = "Proceso de eliminación exitoso.";
          break;
      }
    }

    return notification;
  }
}
