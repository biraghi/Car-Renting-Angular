import { Component } from '@angular/core';
import { ItemNavbar } from './component-custom/navbar/models/ItemNavbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Car-Renting';
  navbar = {
    brand: new ItemNavbar('carRenting', 'Car Renting', '/index'),
    data: [
      {
        item: new ItemNavbar('logout', 'Logout', '/logout'),
        dropdown: [],
        type: 'item',
      },
      {
        item: new ItemNavbar('database', 'Database', '#'),
        dropdown: [
          new ItemNavbar('users', 'Users', '/data/users'),
          new ItemNavbar('cars', 'Cars', '/data/cars'),
          new ItemNavbar('bookings', 'Bookings', '/data/bookings'),
        ],
        type: 'dropdown',
      },
    ],
  };
}
