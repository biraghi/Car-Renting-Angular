import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';
import { AuthJwtService } from 'src/app/service/Auth/authJwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthJwtService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit() {}
  loginUser() {
    this.authService.login(this.loginForm.value);
  }
}
