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
      { key: 'licensePlate', label: 'License PLate' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'model', label: 'Model' },
      { key: 'typeName', label: 'Type Name' },
      { key: 'yearRegistration', label: 'Year Registration' },
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
      case MyTableActionEnum.NEW_ROW:
      case MyTableActionEnum.EDIT: {
        this.dataForm = actionTable.item;
        this.formVisible = true;
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

  formData(newCar: CarModel) {
    if (newCar.id) {
      this.updateCar(newCar);
      this.formVisible = false;
    } else {
      this.addCar(newCar);
      this.formVisible = false;
    }
  }

  updateCar(newCar: CarModel) {
    this.copyData = this.data;
    this.carService.updateCar(newCar).subscribe((car) => {
      this.copyData.forEach((item) => {
        if (item.id == car.id) {
          item = car;
        }
      });
      this.data = this.copyData;
    });
  }

  addCar(newCar: CarModel) {
    this.copyData = this.data;
    newCar.id = Math.max(...this.data.map((o) => o.id)) + 1;
    this.carService.addCar(newCar).subscribe((car) => {
      this.copyData.push(car);
      this.data = this.copyData;
    });
  }
}
