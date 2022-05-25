import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LoadingComponent } from "../loading/loading.component";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private pendingTasks: number = 0;
  private overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) { }

  getLoadingObserver(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  start() {
    if (++this.pendingTasks === 1) {
      this.isLoading$.next(true)
      Promise.resolve(null).then(() => {
        this.overlayRef = this.overlay.create({
          positionStrategy: this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically(),
          hasBackdrop: true,
        });
        this.overlayRef.attach(new ComponentPortal(LoadingComponent));
      })
    }
  }

  stop() {
    if (this.pendingTasks === 0 || --this.pendingTasks === 0) {
      this.isLoading$.next(false);
      this.overlayRef.detach();
      this.overlayRef = undefined;
    }
  }

  reset() {
    this.pendingTasks = 0;
    this.isLoading$.next(false);
    this.overlayRef && this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
