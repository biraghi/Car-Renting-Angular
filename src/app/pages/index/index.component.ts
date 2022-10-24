import { Component, OnInit } from '@angular/core';
import { ItemNavbar } from 'src/app/component-custom/navbar/models/ItemNavbar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  navbar = {
    brand: new ItemNavbar('carRenting', 'Car Renting', '#'),
    data: [
      {
        item: new ItemNavbar('logout', 'Logout', '/logout'),
        dropdown: [],
        type: 'item',
      },
      {
        item: new ItemNavbar('database', 'Database', '#'),
        dropdown: [
          new ItemNavbar('users', 'Users', '/users'),
          new ItemNavbar('cars', 'Cars', '/cars'),
          new ItemNavbar('bookings', 'Bookings', '/bookings'),
        ],
        type: 'dropdown',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
