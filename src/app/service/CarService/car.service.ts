import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from 'src/app/models/CarModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carsUrl = 'api/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.carsUrl);
  }

  getCarByLicensePlate(license_plate: string): Observable<CarModel> {
    return this.http.get<CarModel>(
      this.carsUrl + '/?license_plate=' + license_plate
    );
  }

  deleteCar(id: number) {
    return this.http.delete<CarModel>(this.carsUrl + '/' + id);
  }

  updateCar(newCar: CarModel) {
    return this.http.put<CarModel>(this.carsUrl, newCar, this.httpOptions);
  }

  addCar(newCar: CarModel) {
    return this.http.post<CarModel>(this.carsUrl, newCar, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
