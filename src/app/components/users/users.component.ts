import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;
  isNewUser: boolean;

  constructor(private userService: UserService) {}

  getTrains(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  ngOnInit(): void {
    this.getTrains();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

}
