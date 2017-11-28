import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../interfaces/user';
import {UserService} from '../../../services/user.service';

/* !!! BUG : transmission à la bd ne marche pas à cause du password qui doit être transmit en byte[],
             mais qui n'arrive pas à être lu par le serveur !!! */

/* NewUser Component
 * Attributs :
 * - newUser, user créé par le formulaire
 * - passwd, attribut récupéré dans le formulaire et sensé être converti en byte[] pour l'envoi vers bd (!!!! NE MARCHE PAS !!!!)
 * - submitted, booléen permettant l'affichage du formulaire si égal à false
 * - Input selectedUser transmit par le User component
 * - Outputs eventEmitter (émet un User vers UserService) et hideNewUser (émet un booléen vers User component)
 * ------------------
 * Methodes :
 * - ngOnInit(), création d'un objet newUser à l'initialisation du component avec les champs obligatoires définis vides
 * - onSubmit(), submitted devient true pour cacher le formulaire et est émit vers User component,
 *               passwd converti en byte[], et newUser ajouté à la bd en interrogeant l'api
 * - hide(), submitted devient true pour cacher le formulaire et est émit vers User componen
 * ------------------ */
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
    this.hideNewUser.emit(this.submitted);
    this.newUser.password = new Uint8Array(this.passwd);
    this.service.createUser(this.newUser)
      .subscribe(response => this.eventEmitter.emit(this.newUser));
  }

  hide() {
    this.submitted = true;
    this.hideNewUser.emit(this.submitted);
  }

}
