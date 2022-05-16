import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { HttpErrorComponent } from './http-error/http-error.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    HttpErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
