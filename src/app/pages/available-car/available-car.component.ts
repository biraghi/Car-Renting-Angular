import { Component, OnInit } from '@angular/core';
import { ActionButton } from 'src/app/component-custom/my-table/model/ActionButton';
import { MyTableActionEnum } from 'src/app/component-custom/my-table/model/MyTableActionEnum';
import { MyTableConfig } from 'src/app/component-custom/my-table/model/MyTableConfig';
import { CarModel } from 'src/app/models/CarModel';
import { CarService } from 'src/app/service/CarService/car.service';

@Component({
  selector: 'app-available-car',
  templateUrl: './available-car.component.html',
  styleUrls: ['./available-car.component.css'],
})
export class AvailableCarComponent implements OnInit {
  header: MyTableConfig = {
    headers: [
      { key: 'id', label: 'ID' },
      { key: 'license_plate', label: 'License PLate' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'model', label: 'Model' },
      { key: 'type_name', label: 'Type Name' },
      { key: 'year_registration', label: 'Year Registration' },
    ],
    order: { orderType: '', defaultColumn: '' },
    paginationTable: { itemPerPage: 3, itemPerPageOption: [5, 10, 15] },
    actions: [MyTableActionEnum.BOOK],
  };

  data: CarModel[] = [];
  formVisible: boolean = true;

  constructor(private carService: CarService) {}

  ngOnInit(): void {}

  detectAction(actionTable: ActionButton) {}

  search() {
    this.getCars();
    this.formVisible = false;
  }

  getCars() {
    return this.carService.getCars().subscribe((cars) => (this.data = cars));
  }
}
