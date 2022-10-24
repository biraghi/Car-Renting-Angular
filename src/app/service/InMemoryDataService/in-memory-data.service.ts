import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb() {
    const users = [
      {
        id: 1,
        username: 'lor.bir',
        password: '',
        firstname: 'Lorenzo',
        lastname: 'Biraghi',
        birth_date: new Date('2002-03-13').toLocaleString(),
        admin: true,
      },
      {
        id: 2,
        username: 'fra.vill',
        password: '',
        firstname: 'Franco',
        lastname: 'Villa',
        birth_date: new Date('2003-09-09').toLocaleString(),
        admin: false,
      },
      {
        id: 3,
        username: 'gia.mor',
        password: '',
        firstname: 'Gianni',
        lastname: 'Morandi',
        birth_date: new Date('1985-02-09').toLocaleString(),
        admin: false,
      },
    ];

    const cars = [
      {
        id: 1,
        license_plate: 'ca6dh8h',
        manufacturer: 'Tesla',
        model: 's',
        type_name: 'berlina',
        year_registration: '2020',
      },
      {
        id: 2,
        license_plate: 'gc7agwe',
        manufacturer: 'Bmw',
        model: 'x5',
        type_name: 'suv',
        year_registration: '2018',
      },
      {
        id: 7,
        license_plate: 'cda6h3f',
        manufacturer: 'Audi',
        model: 'r8',
        type_name: 'sportiva',
        year_registration: '2019',
      },
    ];
    return { users, cars };
  }

  constructor() {}
}
