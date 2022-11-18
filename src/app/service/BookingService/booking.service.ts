import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BookingModel } from 'src/app/models/BookingModel';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsUrl = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(this.bookingsUrl + '/all');
  }

  deleteBooking(id: number) {
    return this.http.delete<BookingModel>(this.bookingsUrl + '/deleteId/' + id);
  }

  addBooking(newBooking: BookingModel) {
    return this.http.post<BookingModel>(
      this.bookingsUrl + '/add',
      newBooking,
      this.httpOptions
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
