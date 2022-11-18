import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from 'src/app/models/CarModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carsUrl = 'http://localhost:8080/car';

  constructor(private http: HttpClient) {}

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.carsUrl + '/all');
  }

  getCarByLicensePlate(license_plate: string): Observable<CarModel> {
    return this.http.get<CarModel>(
      this.carsUrl + '/getlLicensePlate=' + license_plate
    );
  }

  deleteCar(id: number) {
    return this.http.delete<CarModel>(this.carsUrl + '/deleteId/' + id);
  }

  updateCar(newCar: CarModel) {
    return this.http.put<CarModel>(
      this.carsUrl + '/update',
      newCar,
      this.httpOptions
    );
  }

  addCar(newCar: CarModel) {
    return this.http.post<CarModel>(
      this.carsUrl + '/add',
      newCar,
      this.httpOptions
    );
  }

  getCarsAvailable(start: Date, finish: Date): Observable<CarModel[]> {
    const datepipe: DatePipe = new DatePipe('en-US');
    let startString = datepipe.transform(start, 'YYYY-MM-dd');
    let finishString = datepipe.transform(finish, 'YYYY-MM-dd');
    let queryParams = new HttpParams();
    if (startString && finishString) {
      queryParams = queryParams.append('start', startString);
      queryParams = queryParams.append('finish', finishString);
    }
    return this.http.get<CarModel[]>(this.carsUrl + '/notBooked', {
      params: queryParams,
    });
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
