import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpButtonComponent } from './help-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HelpButtonComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    IconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    HelpButtonComponent
  ],
})
export class HelpButtonModule { }
