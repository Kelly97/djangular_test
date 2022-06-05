import { Component, Input, OnInit } from '@angular/core';
import icHelp from '@iconify/icons-ic/outline-help-outline'

@Component({
  selector: 'help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss']
})
export class HelpButtonComponent implements OnInit {

  icHelp = icHelp;

  @Input() text: String;

  constructor() { }

  ngOnInit(): void {
  }

}
