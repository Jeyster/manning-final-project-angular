import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';


/* User Component
 * ------------------
 * Attributs :
 * - users, liste des users fournie à l'initialisation du component par la méthode getUsers de UserService
 * - selectedUser, User définit par l'utilisateur lors d'un event click sur la liste users
 * Methodes :
 * - getUsers, utlisateurs récupérés par le service UserService sur la BD mySql attribués à users
 * - onSelect, attribut User choisit à selectUser
 * ------------------ */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;

  constructor(private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

}
