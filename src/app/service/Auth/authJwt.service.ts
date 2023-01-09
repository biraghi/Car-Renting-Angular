import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Token } from 'src/app/models/Token';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class AuthJwtService {
  endpoint: string = 'http://server:8080/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  private http: HttpClient;

  constructor(private handler: HttpBackend, public router: Router) {
    this.http = new HttpClient(handler);
  }
  // Sign-up
  register(user: UserModel): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  login(user: UserModel) {
    return this.http
      .post<any>(`${this.endpoint}authenticate`, user)
      .subscribe((res: any) => {
        console.log('Metodo Login' + res.token);
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(user.username).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['index']);
        });
      });
  }
  getToken() {
    console.log('Metodo getToken' + localStorage.getItem('access_token'));
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  // User profile
  getUserProfile(username: any): Observable<any> {
    let token = localStorage.getItem('access_token');
    let api = `${this.endpoint}user/getUsername/${username}`;
    return this.http
      .get(api, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
