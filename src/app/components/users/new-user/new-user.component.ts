import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../interfaces/user';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUser: User;
  passwd: any;
  submitted = false;
  @Input() selectedUser;
  @Output() eventEmitter: EventEmitter<User> = new EventEmitter();
  @Output() hideNewUser: EventEmitter<boolean> = new EventEmitter();


  constructor(public service: UserService) {}

  ngOnInit() {
    this.newUser =  {
      login: '',
      email: '',
      password: ''
    };
  }

  onSubmit() {
    this.submitted = true;
    this.newUser.password = new Uint8Array(this.passwd);
    this.service.createUser(this.newUser)
      .subscribe(response => this.eventEmitter.emit(this.newUser));
    this.hideNewUser.emit(this.submitted);
  }

  hide() {
    this.submitted = true;
    this.hideNewUser.emit(this.submitted);
  }

}
