import { Component, Input, OnInit } from '@angular/core';
import { MyNavabarConfig } from './models/MyNavabarConfig';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() myNavbarConfig!: MyNavabarConfig;

  constructor() {}

  ngOnInit(): void {}
}
