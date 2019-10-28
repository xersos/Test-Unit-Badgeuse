import {Component, Input, OnInit} from '@angular/core';
import {ExpressService} from '../../services/express.service';
import {Auth} from '../../guards/auth';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import {WebsocketService} from '../../services/websocket.Service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  userList;
  userOn = [];
  userOff = [];
  @Input() adminActive;
  currentDate = new Date().toISOString().slice(0, 10);

  faCircle = faCircle;

  constructor(private expressService: ExpressService,
              private wsService: WebsocketService) {
    this.refreshList();
  }

  ngOnInit() {
    this.getUserList();
  }

  /**
   * refresh the list when a user badge or unbadge
   */
  refreshList() {
    this.wsService.onListenPresence.subscribe((content) => {
      this.updateList(content);
    });
  }

  /**
   * get the user list to the db
   */
  getUserList() {
    const content = {
      action: 'getUserList'
    };
    this.expressService.postExpress('liste', content).subscribe((res: Auth) => {
       if (!res.success) {
        swal('Oups !', res.message, 'error');
      } else {
        this.userList = res.list;
        this.splitPresence();
      }
    });
  }

  /**
   * split user of presence or not
   */
  splitPresence() {
    this.userList.forEach((user) => {
      if (user.presence === 1) {
        this.userOn.push(user);
      } else {
        this.userOff.push(user);
      }
    });
  }

  /**
   * refresh list view
   */
  onRefresh() {
    this.userOn = [];
    this.userOff = [];
    this.splitPresence();
  }

  /**
   * update the userList array
   * @param content
   */
  updateList(content) {
    const presence = content.presence;
    const id_user = content.id_user;
    this.userList.find((user) => {
      if (user.userId === id_user) {
        user.presence = Number(presence);
        this.onRefresh();
      }
    });
  }



}
