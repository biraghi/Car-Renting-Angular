import { Component, Input, OnInit } from '@angular/core';
import { AuthJwtService } from 'src/app/service/Auth/authJwt.service';
import { MyNavabarConfig } from './models/MyNavabarConfig';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() myNavbarConfig!: MyNavabarConfig;

  constructor(private authJwtService: AuthJwtService) {}

  ngOnInit(): void {}

  logout() {
    this.authJwtService.doLogout();
  }
}
