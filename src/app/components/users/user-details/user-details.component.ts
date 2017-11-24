import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {UsersComponent} from '../users.component';
import {User} from '../../../interfaces/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() selectedUser;
  @Input() maxRank;
  @Output() changeSelectedUser: EventEmitter<User> = new EventEmitter();
  @Output() newRankEmitter = new EventEmitter();


  constructor(private userService: UserService, private userComponent: UsersComponent) { }

  ngOnInit() {
  }

  changeRank(newRank: number): void {
    this.selectedUser.rank = newRank;
    this.userService.updateUser(this.selectedUser)
      .subscribe(response => this.newRankEmitter.emit(this.selectedUser));
  }

  deleteUser(): void {
    this.userComponent.deleteUser(this.selectedUser.id)
    this.selectedUser = null;
  }

  hide() {
    this.selectedUser = null;
    this.changeSelectedUser.emit(this.selectedUser);
  }

}
