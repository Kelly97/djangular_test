import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LoadingService } from "../services/loading.service";

@Component({
  selector: "confi-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingSubscribe();
  }

  loadingSubscribe() {
    this.loadingService.getLoadingObserver().subscribe((state) => {
      this.isLoading = state;
      this.cd.detectChanges();
    });
  }
}
