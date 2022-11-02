import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  IterableDiffers,
} from '@angular/core';
import { MyTableConfig } from './model/MyTableConfig';
import { cloneDeep, orderBy, get } from 'lodash';
import { ActionButton } from './model/ActionButton';
import { MyTableActionEnum } from './model/MyTableActionEnum';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTableComponent implements OnInit, OnChanges {
  @Input() tableConfig!: MyTableConfig;
  @Input() data!: any[];
  @Output() actionChange: EventEmitter<ActionButton> = new EventEmitter();

  icon: string = '';
  searchText = '';
  searchHeader?: string;
  currentPage = 0;
  maxPage = 0;
  itemPerPage = 0;
  dataModify: boolean = false;
  MyTableActionEnum = MyTableActionEnum;

  iterableDiffer: any;

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = iterableDiffers.find([]).create(undefined);
  }

  ngOnChanges(changes: SimpleChanges) {
    let change = this.iterableDiffer.diff(this.data);
    if (change) {
      console.log(this.data);
    }

    this.setMaxPage();
  }

  ngOnInit(): void {
    this.itemPerPage = this.tableConfig.paginationTable.itemPerPage;
  }

  isAdd(action: string): boolean {
    if (action == MyTableActionEnum.NEW_ROW) return true;
    else return false;
  }

  cambioValore(event: any, isSelect: boolean) {
    if (isSelect) {
      this.searchHeader = event.target.value;
    } else {
      this.searchText = event.target.value;
    }
  }

  changeItemPerPage(event: any) {
    this.itemPerPage = event.target.value;
    this.setMaxPage();
    this.currentPage = 0;
  }

  changeOrder(order: string) {
    if (
      this.tableConfig.order.orderType == 'desc' ||
      !this.tableConfig.order.orderType
    ) {
      this.data = orderBy(this.data, [order], ['asc']);
      this.tableConfig.order.defaultColumn = order;
      this.tableConfig.order.orderType = 'asc';
      this.icon = 'up';
    } else if (this.tableConfig.order.orderType == 'asc') {
      this.data = orderBy(this.data, [order], ['desc']);
      this.tableConfig.order.defaultColumn = order;
      this.tableConfig.order.orderType = 'desc';
      this.icon = 'down';
    }
  }

  pageNavigation(add: boolean) {
    if (add == false) {
      if (this.currentPage > 0) {
        this.currentPage -= 1;
      }
    } else {
      if (this.currentPage < this.maxPage) {
        this.currentPage += 1;
      }
    }
  }

  setMaxPage() {
    if (cloneDeep(this.data).length > this.itemPerPage) {
      this.maxPage = (this.data.length / this.itemPerPage) | 0;
    } else {
      this.maxPage = 0;
    }
  }

  actionButton(item: any, action: string) {
    this.actionChange.emit({ action, item });
  }

  getValueOfList(object: any, path: string): any {
    return get(object, path);
  }
}
