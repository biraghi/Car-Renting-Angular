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
    return { users };
  }

  constructor() {}
}
