import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { ActionButton } from 'src/app/component-custom/my-table/model/ActionButton';
import { MyTableActionEnum } from 'src/app/component-custom/my-table/model/MyTableActionEnum';
import { MyTableConfig } from 'src/app/component-custom/my-table/model/MyTableConfig';
import { BookingModel } from 'src/app/models/BookingModel';
import { BookingTableModel } from 'src/app/models/BookingTableModel';
import { CarModel } from 'src/app/models/CarModel';
import { UserModel } from 'src/app/models/UserModel';
import { BookingService } from 'src/app/service/BookingService/booking.service';
import { CarService } from 'src/app/service/CarService/car.service';
import { UserService } from 'src/app/service/UserService/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  header: MyTableConfig = {
    headers: [
      { key: 'id', label: 'ID' },
      { key: 'startDate', label: 'Start Date' },
      { key: 'finishDate', label: 'Finish Date' },
      { key: 'user.username', label: 'User Username' },
      { key: 'car.licensePlate', label: 'Car License PLate' },
      { key: 'approve', label: 'Approve' },
    ],
    order: { orderType: '', defaultColumn: '' },
    paginationTable: { itemPerPage: 3, itemPerPageOption: [5, 10, 15] },
    actions: [
      MyTableActionEnum.NEW_ROW,
      MyTableActionEnum.APPROVE,
      MyTableActionEnum.DELETE,
    ],
  };

  data: BookingModel[] = [];

  dataForm?: BookingModel;
  formVisible: boolean = false;

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.data = bookings;
    });
  }

  detectAction(actionTable: ActionButton) {
    switch (actionTable.action) {
      case MyTableActionEnum.DELETE: {
        this.deleteBooking(actionTable.item);
        break;
      }
      case MyTableActionEnum.NEW_ROW: {
        this.router.navigate(['car/available']);
        break;
      }
      case MyTableActionEnum.APPROVE: {
        this.data.forEach((item) => {
          if (item.id == actionTable.item.id) {
            item.approve = true;
          }
        });
      }
    }
  }

  deleteBooking(booking: BookingModel) {
    this.bookingService
      .deleteBooking(booking.id)
      .subscribe(
        (bookingDelete) =>
          (this.data = this.data.filter((item) => item.id != booking.id))
      );
  }

  formData(newBooking: BookingModel) {
    this.addBooking(newBooking);
    this.formVisible = false;
  }

  addBooking(newBooking: BookingModel) {
    newBooking.id = Math.max(...this.data.map((o) => o.id)) + 1;

    this.bookingService.addBooking(newBooking).subscribe((booking) => {
      this.data.push(cloneDeep(booking));
      console.log(this.data);
    });
  }
}
