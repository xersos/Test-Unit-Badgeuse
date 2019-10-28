import {Component, Input, OnInit} from '@angular/core';
import {faBell, faChessQueen, faTimesCircle, faUserAstronaut} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {ExpressService} from '../services/express.service';
import {Auth} from '../guards/auth';
import swal from 'sweetalert2';
import {AbsenceService} from '../services/absence.service';
import {WebsocketService} from '../services/websocket.Service';
// @ts-ignore
import publicIp from 'public-ip';
import {Subject, Subscription} from 'rxjs';
import {BadgerService} from '../services/badger.service';
import {log} from "util";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  faChessQueen = faChessQueen;
  faUserAstronaut = faUserAstronaut;
  faTimesCircle = faTimesCircle;
  faBell = faBell;
  userData;
  nomUser;
  prenomUser;
  presenceUser;
  presenceUserSubscription: Subscription;
  idUser;
  badgerActive;
  @Input() adminActive;
  alerteActive = false;
  alerteData;
  nbAbsence = 0;
  publicIp;


  constructor(private userService: UserService,
              private loginService: LoginService,
              private router: Router,
              private expressService: ExpressService,
              private absenceService: AbsenceService,
              private wsService: WebsocketService,
              private badgerService: BadgerService) { }

    ngOnInit() {
        this.badgerActive = false;
        this.refreshPresence();
        this.getDataUser();

        // this.getTotalAbsence();
        this.refreshNbAbsence();
        this.getPublicIp();
    }

  /**
   * refresh status of presence
   */
  refreshPresence() {
    this.presenceUserSubscription = this.badgerService.presenceSubject.subscribe(
        (presence: any[]) => {
          this.presenceUser = presence;
        }
    );
  }

  /**
   * get the public ip adresse
   */
  getPublicIp() {
    console.log('getIpPublic')
      publicIp.v4().then((ip) => {
        this.publicIp = ip;
        console.log(ip)
          this.getAccessBadger();
      });
    }

    /**
     * refresh number of absence in wait when websocket.io emit
     */
    refreshNbAbsence() {
      this.wsService.onListenAbsenceList.subscribe((content) => {
        this.nbAbsence = content.nbAbsence;
      });
    }

   /**
     * get number of absence in wait
     */
  getTotalAbsence() {
      this.absenceService.getUserListAbsence((res: Auth) => {
        if (res.success) {
          this.nbAbsence = res.list.length;
          console.log('aficher nbAbsence ' + res.list.length);
        }
      });
    }

    /**
     * get all data of user
     */
    getDataUser() {
        this.userService.getDataUser((res) => {
          this.userData = res;
          this.nomUser = this.userData.nom_user;
          this.prenomUser = this.userData.prenom_user;
          this.presenceUser = this.userData.presence;
          this.idUser = this.userData.id_user;
          this.getAlerte();
        });
    }

    /**
     * logOut the user
     */
    onDisconnect() {
        this.loginService.logout();
        this.router.navigate(['/']);
    }

    /**
     *  Check if the student are forget unbadge yesterday
     */
    getAlerte() {
      const content = {
        action : 'getDataAlerte',
        id_user: this.idUser
      };
      this.expressService.postExpress('alerte', content).subscribe((res: Auth) => {
        if (!res.success && res.message === 'error') {
          swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
        } else {
          this.alerteActive = res.success;
          this.alerteData = res.user;
        }
      });
    }

    /**
     * check if the client is in UHA 4.0 area
     */
    getAccessBadger() {

      const content = {
        action: 'getAccessBadger',
        ipPublic: this.publicIp
      };
        this.expressService.postExpress('badger', content).subscribe((res: Auth) => {
          this.badgerActive = res.success;
          console.log(res)
        });
    }



}
