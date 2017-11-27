import {Component, OnInit} from '@angular/core';
import {User} from '../interfaces/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedInUser: User = null;
  urlQueryString: string = window.location.search;
  index = this.urlQueryString.indexOf('=');
  loggedInUserToken: string = this.urlQueryString.substring(this.index + 1);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserByToken(this.loggedInUserToken)
      .subscribe(user => this.loggedInUser = user);
  }
}
