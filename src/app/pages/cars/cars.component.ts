import { Component, OnInit } from '@angular/core';
import { httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';
import { ActionButton } from 'src/app/component-custom/my-table/model/ActionButton';
import { MyTableActionEnum } from 'src/app/component-custom/my-table/model/MyTableActionEnum';
import { MyTableConfig } from 'src/app/component-custom/my-table/model/MyTableConfig';
import { CarModel } from 'src/app/models/CarModel';
import { CarService } from 'src/app/service/CarService/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
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
    actions: [
      MyTableActionEnum.NEW_ROW,
      MyTableActionEnum.EDIT,
      MyTableActionEnum.DELETE,
    ],
  };

  data: CarModel[] = [];
  copyData: CarModel[] = [];

  dataForm?: CarModel;

  formVisible: boolean = false;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    return this.carService.getCars().subscribe((cars) => (this.data = cars));
  }

  detectAction(actionTable: ActionButton) {
    switch (actionTable.action) {
      case MyTableActionEnum.DELETE: {
        this.deleteCar(actionTable.item);
        break;
      }
      case (MyTableActionEnum.NEW_ROW, MyTableActionEnum.EDIT): {
        break;
      }
    }
  }

  deleteCar(car: CarModel) {
    this.carService
      .deleteCar(car.id)
      .subscribe(
        (carDeleted) =>
          (this.data = this.data.filter((item) => item.id != car.id))
      );
  }
}
