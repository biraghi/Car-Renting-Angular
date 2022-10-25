import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BookingModel } from 'src/app/models/BookingModel';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsUrl = 'api/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(this.bookingsUrl);
  }
}
