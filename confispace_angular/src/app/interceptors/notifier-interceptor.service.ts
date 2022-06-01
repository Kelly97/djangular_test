import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NotifyService } from "../components/services/notify.service";
import { notifierType } from "../components/notifier/notifier.component";

@Injectable({
  providedIn: "root",
})
export class NotifierInterceptorService implements HttpInterceptor {
  constructor(
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
      })
    );
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
