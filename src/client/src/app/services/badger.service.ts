import { Injectable } from '@angular/core';
import {ExpressService} from './express.service';
import {Auth} from '../guards/auth';
import {UserService} from './user.service';
import swal from 'sweetalert2';
import {WebsocketService} from './websocket.Service';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BadgerService {

  presenceSubject = new Subject<any[]>();

  constructor(private expressService: ExpressService,
              private userService: UserService,
              private wsService: WebsocketService) { }

  /**
   * emit status of presence
   * @param presence
   */
  emitPresenceSubject(presence) {
    this.presenceSubject.next(presence);
  }

  /**
   * update the presence to users table. 0 = 'absent', 1 = 'présent' and add a point to badger table.
   * @param presence
   * @param callback
   */
  setPresence (presence, callback) {
    this.userService.getIdUser((id_user) => {
      const content = {
        action: 'setPresence',
        id_user: id_user,
        presence: presence
      };
      this.expressService.postExpress('badger', content).subscribe((res: Auth) => {
        if (!res.success) {
          swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
        } else {
          const socketContent = {
            action: 'presence',
            presence : !presence,
            id_user: id_user
          };
          this.wsService.sendSocket(socketContent); // send a signal on socket.io
          this.emitPresenceSubject(!presence);
          return callback(res);
        }
      });
    });
  }
}
