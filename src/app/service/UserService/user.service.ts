import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserModel } from 'src/app/models/UserModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'http://server:8080/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.usersUrl + '/all');
  }

  getUserByUsername(username: string): Observable<UserModel> {
    return this.http.get<UserModel>(this.usersUrl + '/getUsername/' + username);
  }

  deleteUser(id: number) {
    return this.http.delete<UserModel>(this.usersUrl + '/deleteId/' + id);
  }

  addUser(newUser: UserModel) {
    return this.http.post<UserModel>(
      this.usersUrl + '/add',
      newUser,
      this.httpOptions
    );
  }

  updateUser(newUser: UserModel) {
    return this.http.put<UserModel>(
      this.usersUrl + '/update',
      newUser,
      this.httpOptions
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
