import { HttpClient } from '@angular/common/http';
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

  deleteCar(id: number) {
    return this.http.delete<CarModel>(this.carsUrl + '/' + id);
  }
}
