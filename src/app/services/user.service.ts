import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../interfaces/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private baseUrl: string = 'http://localhost:8080/projet-final-1.0-SNAPSHOT/api/users';

  constructor(private http: Http) { }

  /* Effectue la requête getUsers de l'api JAX-RS
  *  renvoie la liste des utilisateurs présent dans la BD */
  getUsers(): Observable<User[]> {
    return this.http.get(`${this.baseUrl}`)
      .map(response => response.json());
  }

  getUserByToken(loggedInUserToken: string) {
    return this.http.get(`${this.baseUrl}/` + loggedInUserToken)
      .map(response => response.json());
  }

  updateUser(selectedUser: User): Observable<User> {
    return this.http.post(`${this.baseUrl}/update`, selectedUser)
      .map(response => response.json());
  }

  deleteUserById(id: number): Observable<User> {
    return this.http.delete(`${this.baseUrl}/` + id)
      .map(response => response.json());
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`${this.baseUrl}/new-user`, user)
      .map(response => response.json());
  }

}
