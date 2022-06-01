import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icClear from '@iconify/icons-ic/clear';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icCheck from '@iconify/icons-ic/round-check-circle-outline';
import icMinus from '@iconify/icons-ic/outline-do-not-disturb-on';


import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTableDataSource } from '@angular/material/table';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ComponentType } from '@angular/cdk/portal';
import { DataTableService } from '../services/data-table.service';

@UntilDestroy()
@Component({
  selector: 'custom-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  icEdit = icEdit;
  icDelete = icDelete;
  icSearch = icSearch;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icClear = icClear;
  icMoreHoriz = icMoreHoriz;
  icCheck = icCheck;
  icMinus = icMinus;

  @Input() columns: TableColumn<any>[] = [];
  @Input() dialogComponent: ComponentType<any>;
  @Input() getApiUrl: string = '';
  @Input() deleteApiUrl: string = '';
  @Input() noun: string = 'Elemento';
  @Input() pluralNoun: string = 'Elementos';
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];

  tableItems: any[];
  selection = new SelectionModel<any>(true, []);
  searchCtrl = new FormControl();

  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<any> | null;

  constructor(private dialog: MatDialog, private dataTableService: DataTableService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
    this.getData();
    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(items => {
      this.tableItems = items;
      this.dataSource.data = items;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData() {
    this.dataTableService.getItems(this.getApiUrl).subscribe((res: any[]) => {
      this.tableItems = res;
      this.dataSource.data = res;
    })
  }

  deleteOne(item: any) {
    this.dataTableService.deleteITem(item.id, this.deleteApiUrl).subscribe(
      (result: any) => {
        this.tableItems.splice(this.tableItems.findIndex((existingItem) => existingItem.id === item.id), 1);
        this.selection.deselect(item);
        this.subject$.next(this.tableItems);
      }
    )
  }

  updateItem(item: any) {
    this.dialog.open(this.dialogComponent, {
      data: item,
      panelClass: ['m-3', 'w-full', 'max-w-lg'],
      maxWidth: "auto",
    }).afterClosed().subscribe(updateItem => {
      if (updateItem) {
        const index = this.tableItems.findIndex((existingCustomer) => existingCustomer.id === updateItem.id);
        this.tableItems[index] = updateItem;
        this.subject$.next(this.tableItems);
      }
    });
  }

  deleteMany(items: any[]) {
    items.forEach(c => this.deleteOne(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  createItem() {
    this.dialog.open(this.dialogComponent, {
      panelClass: ['m-3', 'w-full', 'max-w-lg'],
      maxWidth: "auto",
    }).afterClosed().subscribe((item: any) => {
      if (item) {
        this.tableItems.unshift(item);
        this.subject$.next(this.tableItems);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


}
