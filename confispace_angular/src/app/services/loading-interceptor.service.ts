import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from "../components/services/loading.service";

@Injectable({
  providedIn: "root",
})
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get("skipLoading")) return next.handle(req);
    this.loadingService.start();
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.stop();
      })
    );
  }
}
