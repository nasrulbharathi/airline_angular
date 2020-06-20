import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { CrudandFilterModel } from 'src/common/models/table.model';

@Component({
  selector: 'ar-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  public columHeaders: string[];

  @Input()
  public tableData: any = [];

  @Input()
  public crudAndFilterData: CrudandFilterModel;

  @Output()
  public emitCrudAction = new EventEmitter<any>();

  public dataSource: MatTableDataSource<any>;

  public action = false;

  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    // const self = this;
    // tslint:disable-next-line: triple-equals
    if (this.crudAndFilterData && this.columHeaders[this.columHeaders.length - 1] != 'actions') {
      this.columHeaders.push('actions');
      if (this.crudAndFilterData.filterColumns) {
        this.dataSource.filterPredicate = (data, filter: string): boolean => {
          return this.filterData(data, filter, this.crudAndFilterData.filterColumns);
        };
      }
    }
  }

  public refreshTable(tableData: any): void {
    this.dataSource = new MatTableDataSource(tableData);
  }

  public filterData(data, filter, filterColumns): boolean {
      let exp: boolean;
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < filterColumns.length; i++) {
        exp = exp ||  data[filterColumns[0]].toLowerCase().includes(filter);
      }
      return exp;
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public crudAction(action, i?, rowData?): void {
    const obj = {
      action: action,
      index: i,
      rowData: rowData
    };
    this.emitCrudAction.emit(obj);
  }

  public isObject(val): any {
    if ( val instanceof Array) {
      let returnData = '';
      val.forEach(element => {
        returnData += ' ' + element;
      });
      return returnData;
    } else if (val instanceof Object) {
      return Object.keys(val);
    } else {
      return val;
    }
  }

}
