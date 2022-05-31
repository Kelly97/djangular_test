import { Component, OnInit } from '@angular/core';
import { Holiday } from '../interfaces/holiday';
import { HolidaysService } from '../services/holidays.service';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';

@Component({
  selector: 'vex-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
})
export class HolidaysComponent implements OnInit {

  columns: TableColumn<Holiday>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Fecha Festiva', property: 'date', type: 'date', visible: true, pipe: "MMM dd, y" },
    { label: 'Descripción', property: 'description', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Estatus', property: 'is_active', type: 'boolean', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  getApiUrl: string = "conf/holidays/listcreate/";
  deleteApiUrl: string = "conf/holidays/destroy/";
  HolidayFormComponent = HolidayFormComponent;

  constructor(public holidaysService: HolidaysService) { }

  ngOnInit(): void { }

}
