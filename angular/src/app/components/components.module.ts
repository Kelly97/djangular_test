import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { HttpErrorComponent } from './http-error/http-error.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    HttpErrorComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    HttpErrorComponent,
    MainLayoutComponent]
})
export class ComponentsModule { }
