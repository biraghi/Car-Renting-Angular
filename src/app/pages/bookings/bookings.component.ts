import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MyTableActionEnum } from 'src/app/component-custom/my-table/model/MyTableActionEnum';
import { MyTableConfig } from 'src/app/component-custom/my-table/model/MyTableConfig';
import { BookingModel } from 'src/app/models/BookingModel';
import { BookingTableModel } from 'src/app/models/BookingTableModel';
import { BookingService } from 'src/app/service/BookingService/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  header: MyTableConfig = {
    headers: [
      { key: 'id', label: 'ID' },
      { key: 'start_date', label: 'Start Date' },
      { key: 'finish_date', label: 'Finish Date' },
      { key: 'username', label: 'User Username' },
      { key: 'license_plate', label: 'Car License PLate' },
      { key: 'approve', label: 'Approve' },
    ],
    order: { orderType: '', defaultColumn: '' },
    paginationTable: { itemPerPage: 3, itemPerPageOption: [5, 10, 15] },
    actions: [
      MyTableActionEnum.NEW_ROW,
      MyTableActionEnum.EDIT,
      MyTableActionEnum.DELETE,
    ],
  };

  data: BookingModel[] = [];
  dataTable: BookingTableModel[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.data = bookings;
      let itemsForTable: BookingTableModel[] = [];

      this.data.forEach((booking) =>
        itemsForTable.push(new BookingTableModel(booking))
      );
      this.dataTable = itemsForTable;
    });
  }
}
