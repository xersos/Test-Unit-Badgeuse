import { Injectable } from '@angular/core';
import {ExpressService} from './express.service';
import {Auth} from '../guards/auth';
import {WebsocketService} from './websocket.Service';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {


  constructor(private expressService: ExpressService,
              private wsService: WebsocketService) { }

  /**
   * get the user  list to db
   */
  getUserListAbsence(callback) {
    const content = {
      action: 'getUserListAbsence'
    };
    this.expressService.postExpress('absence_admin', content).subscribe((res: Auth) => {
      return callback(res);
    });
  }

  /**
   * emit to websocket.io a new number of absence in wait
   */
  emitNbAbsenceSubject() {
    this.getUserListAbsence((res) => {

      const socketContent = {
        action : 'absenceList',
        nbAbsence : res.list.length
      };
      this.wsService.sendSocket(socketContent); // send a signal on socket.io
    })

  }
}
