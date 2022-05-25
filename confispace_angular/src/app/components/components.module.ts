import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingComponent } from "./loading/loading.component";
import { NotifierComponent } from './notifier/notifier.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { IconModule } from "@visurel/iconify-angular";

@NgModule({
  declarations: [LoadingComponent, NotifierComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule,
    IconModule],
  exports: [LoadingComponent, NotifierComponent],
})
export class ComponentsModule { }
