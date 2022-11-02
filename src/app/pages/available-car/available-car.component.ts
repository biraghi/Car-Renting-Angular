import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionButton } from 'src/app/component-custom/my-table/model/ActionButton';
import { MyTableActionEnum } from 'src/app/component-custom/my-table/model/MyTableActionEnum';
import { MyTableConfig } from 'src/app/component-custom/my-table/model/MyTableConfig';
import { BookingModel } from 'src/app/models/BookingModel';
import { CarModel } from 'src/app/models/CarModel';
import { UserModel } from 'src/app/models/UserModel';
import { BookingService } from 'src/app/service/BookingService/booking.service';
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

  start_date = new FormControl();
  finish_date = new FormControl();

  user: UserModel = {
    id: 1,
    username: 'lor.bir',
    password: '',
    firstname: 'Lorenzo',
    lastname: 'Biraghi',
    birth_date: new Date('2002-03-13').toLocaleString(),
    admin: true,
  };

  constructor(
    private carService: CarService,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {}

  detectAction(actionTable: ActionButton) {
    this.addBooking(actionTable.item);
  }

  search() {
    this.getCars();
    this.formVisible = false;
  }

  getCars() {
    return this.carService.getCars().subscribe((cars) => (this.data = cars));
  }

  addBooking(car: CarModel) {
    let newBooking: BookingModel = {
      id: 18,
      finish_date: this.finish_date.value.toLocaleString(),
      start_date: this.start_date.value.toLocaleString(),
      user: this.user,
      car: car,
      approve: false,
    };

    this.bookingService.addBooking(newBooking).subscribe((booking) => {
      this.router.navigate(['data/bookings']);
    });
  }
}
