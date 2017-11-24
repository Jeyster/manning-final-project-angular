import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import {forEach} from '@angular/router/src/utils/collection';


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
  maxRank: number = 0;
  @Output() eventEmitter = new EventEmitter();

  constructor(private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
    this.users.forEach(function(currentUser) {
      if (currentUser.rank > this.maxRank) {
        this.maxRank = currentUser.rank;
      }
    } );
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].rank > this.maxRank) {
        this.maxRank = this.users[i].rank;
      }
    }
  }

  changeRank(newRank: number): void {
    this.selectedUser.rank = newRank;
    this.userService.updateUser(this.selectedUser)
      .subscribe(response => this.eventEmitter.emit(this.selectedUser));
  }

}
