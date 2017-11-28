import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UsersComponent} from '../users.component';
import {User} from '../../../interfaces/user';

/* UserDetails Component
 * Attributs :
 * - Input loggedInUser, user connecté transmis par le User component (lui-même transmit par l'app component)
 * - Inputs selectedUser, minRank et maxRank transmis par le User component
 * - Outputs changeSelectedUser (émet vers User component) et newRankEmitter (émet vers User service)
 * ------------------
 * Methodes :
 * - changeRank(newRank), récupère le rang choisi par l'admin, l'attribue au selectedUser et l'inscrit dans la bd en interrogeant l'api
 * - deleteUser(), exécute la méthode deleteUser(userId) du User component
 * - hide(), rend null le selectedUser et transmet l'info au User component
 * ------------------ */
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  @Input() loggedInUser;
  @Input() selectedUser;
  @Input() minRank;
  @Input() maxRank;
  @Output() changeSelectedUser: EventEmitter<User> = new EventEmitter();
  @Output() newRankEmitter = new EventEmitter();


  constructor(private userService: UserService, private userComponent: UsersComponent) { }

  changeRank(newRank: number): void {
    this.selectedUser.rank = newRank;
    this.userService.updateUser(this.selectedUser)
      .subscribe(response => this.newRankEmitter.emit(this.selectedUser));
  }

  deleteUser(): void {
    this.userComponent.deleteUser(this.selectedUser.id)
  }

  hide() {
    this.selectedUser = null;
    this.changeSelectedUser.emit(this.selectedUser);
  }

}
