import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../interfaces/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private baseUrl: string = 'http://localhost:8080/projet-final-1.0-SNAPSHOT/api/users';

  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}`)
      .map(response => response.json());
  }

  createUser(user: User): Observable<User[]> {
    return this.http.post(`${this.baseUrl}/new-user`, user)
      .map(response => response.json());
  }
}
