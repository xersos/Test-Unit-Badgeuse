import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.css']
})
export class PersonalSpaceComponent implements OnInit {

  monthActive = 'agendaWeek';
  id_user;
  currentDate = new Date().toISOString().slice(0, 10);

  constructor(private userService: UserService) {
    this.getIdUser();
  }

  ngOnInit() {

  }

  /**
   * get the id of user connected
   */
  getIdUser() {
    this.userService.getIdUser((id) => {
      this.id_user = id;
    });
  }

}
