import { BookingModel } from './BookingModel';
import { CarModel } from './CarModel';
import { UserModel } from './UserModel';

export class BookingTableModel {
  id: number;
  finish_date: string;
  start_date: string;
  username: string;
  license_plate: string;
  approve: boolean;

  constructor(bookingModel: BookingModel) {
    this.id = bookingModel.id;
    this.start_date = bookingModel.start_date;
    this.finish_date = bookingModel.finish_date;
    this.approve = bookingModel.approve;
    this.username = bookingModel.user.username;
    this.license_plate = bookingModel.car.license_plate;
  }
}
