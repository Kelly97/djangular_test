import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstWordPipe } from './first-word.pipe';



@NgModule({
  declarations: [FirstWordPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FirstWordPipe
  ]
})
export class FirstWordModule { }
