import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private pendingTasks: number = 0;

  constructor() {}

  getLoadingObserver(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  start() {
    if (++this.pendingTasks === 1) this.isLoading$.next(true);
  }

  stop() {
    if (this.pendingTasks === 0 || --this.pendingTasks === 0)
      this.isLoading$.next(false);
  }

  reset() {
    this.pendingTasks = 0;
    this.isLoading$.next(false);
  }
}
