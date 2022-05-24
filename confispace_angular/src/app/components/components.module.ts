import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";
import { LoadingComponent } from "./loading/loading.component";
import { NotifierComponent } from './notifier/notifier.component';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [LoadingComponent, NotifierComponent],
  imports: [CommonModule, ComponentsRoutingModule, MatButtonModule],
  exports: [LoadingComponent, NotifierComponent],
})
export class ComponentsModule { }
