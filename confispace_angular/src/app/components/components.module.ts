import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoadingComponent } from "./loading/loading.component";
import { NotifierComponent } from './notifier/notifier.component';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { IconModule } from "@visurel/iconify-angular";
import { DataTableComponent } from './data-table/data-table.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  declarations: [LoadingComponent, NotifierComponent, DataTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatMenuModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ContainerModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatDatepickerModule],
  exports: [LoadingComponent, NotifierComponent, DataTableComponent],
})
export class ComponentsModule { }
