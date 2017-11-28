import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';


/* User Component
 * ------------------
 * Attributs :
 * - users, liste des users fournie à l'initialisation du component par la méthode getUsers() de UserService
 * - selectedUser, User attribué lors d'un event click (associé à la méthode onSelect()) sur un user listé
 * - minRank, rang minimal que peut attribuer l'admin au selectedUser (dépend du rang de celui-ci)
 *    --> calculé à chaque event click onSelect()
 * - maxRank, rang maximal parmi la liste des users --> récupéré à l'initialisation du component par getUsers()
 * - Input loggedInUser, user connecté transmis par l'app component en input
 * ------------------
 * Methodes :
 * - getUsers(), liste des users récupérée dans la bd par le service UserService qui interroge l'api jaxrs
 * - onSelect(user), attribut un user choisit dans la liste à selectedUser et calcul minRank
 * - changeSelectedUser(user), méthode associée à l'event changeSelectedUser du component UserDetails
 *    --> récupère le selectedUser émit
 * - deleteUser(userId), supprime le user selectedUser grâce au service UserService qui interroge l'api
 *    --> mets à jour la liste affiché grâce à un filtre
 * - goToHome(), méthode associée à un event click sur boutton Home
 * ------------------ */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = null;
  minRank = 1;
  maxRank = 0;
  @Input() loggedInUser;
  // newUser = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].rank > this.maxRank) {
            this.maxRank = this.users[i].rank;
          }
        }
      });
  }

  onSelect(user: User): void {
    this.selectedUser = user;
    this.minRank = 1;
    if (this.selectedUser.rank >= this.loggedInUser.rank) {
      this.minRank = this.selectedUser.rank;
    }
  }

  changeSelectedUser(user: User) {
    this.selectedUser = user;
  }

  deleteUser(selectedUserId: number): void {
    this.userService.deleteUserById(selectedUserId)
      .subscribe(response => {
        this.users = this.users.filter(user => user.id !== this.selectedUser.id);
        this.selectedUser = null;
      });
  }

  goToHome() {
    window.location.href = 'http://localhost:8080/projet-final-1.0-SNAPSHOT';
  }

  /*
  addUser(): void {
    this.selectedUser = null;
    this.newUser = true;
  }

  hideNewUser() {
    this.newUser = false;
  }
  */

}
