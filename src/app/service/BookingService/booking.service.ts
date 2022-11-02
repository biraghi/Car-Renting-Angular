import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  deleteBooking(id: number) {
    return this.http.delete<BookingModel>(this.bookingsUrl + '/' + id);
  }

  addBooking(newBooking: BookingModel) {
    return this.http.post<BookingModel>(
      this.bookingsUrl,
      newBooking,
      this.httpOptions
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
