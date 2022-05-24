import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, take } from "rxjs/operators";
import { LoadingService } from "src/app/components/services/loading.service";

@Injectable({
  providedIn: "root",
})
export class SplashScreenService {
  splashScreenElem: HTMLElement;

  constructor(private router: Router, private loadingService: LoadingService) {
    this.loadingService.start();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        this.loadingService.stop();
      });
  }
}
