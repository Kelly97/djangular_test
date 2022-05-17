import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Input() customTemplate: TemplateRef<any>;
  appName: string = environment.appName;
  currentYear = new Date().getFullYear();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void { }
}
