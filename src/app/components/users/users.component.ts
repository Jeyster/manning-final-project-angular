import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  selectedUser: User = null;
  maxRank = 0;
  newUser = false;
  @Output() eventEmitter = new EventEmitter();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
    this.users.forEach(function(currentUser) {
      if (currentUser.rank > this.maxRank) {
        this.maxRank = currentUser.rank;
      }
    } );
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].rank > this.maxRank) {
        this.maxRank = this.users[i].rank;
      }
    }
  }

  addUser(): void {
    this.selectedUser = null;
    this.newUser = true;
  }

  deleteUser(selectedUserId: number): void {
    this.userService.deleteUser(selectedUserId)
      .subscribe(response => {
        this.users = this.users.filter(user => user.id !== this.selectedUser.id);
        this.selectedUser = null;
      });
  }

  goToHome() {
    window.location.href = 'http://localhost:8080/projet-final-1.0-SNAPSHOT';
  }

  changeSelectedUser(user: User) {
    this.selectedUser = user;
  }

  hideNewUser() {
    this.newUser = false;
  }

}
