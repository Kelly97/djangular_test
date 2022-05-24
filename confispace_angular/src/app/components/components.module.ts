import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsRoutingModule } from "./components-routing.module";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule, ComponentsRoutingModule],
  exports: [LoadingComponent],
})
export class ComponentsModule {}
