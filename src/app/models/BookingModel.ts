import { CarModel } from './CarModel';
import { UserModel } from './UserModel';

export interface BookingModel {
  id: number;
  finish_date: string;
  start_date: string;
  user: UserModel;
  car: CarModel;
  approve: boolean;
}
