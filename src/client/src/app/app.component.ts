import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {faAngleDoubleDown, faAngleDoubleLeft, faAngleDoubleRight, faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import {WebsocketService} from './services/websocket.Service';
import {AuthTokenService} from './services/auth-token.service';
import {ExpressService} from './services/express.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;
  iconIn;
  iconOut;
  btnSideBar;
  adminActive = false;

  constructor(private userService: UserService,
              private wsService: WebsocketService,
              private authTokenService: AuthTokenService,
              private expressService: ExpressService
  ) {
    // connect the socket.io and listen
    this.wsService.listenSocket();
    this.ckeckToken();
  }

  ngOnInit() {
    this.defineIconList();
    this.closeListOnInit();
    this.getConnectStatus();
    this.isUserAdmin();
  }

  ckeckToken() {
    // this.expressService.checkTokenBack((isOk) => { });
  }

  /**
   * check if user is a administrator
   */
  isUserAdmin() {
    this.userService.isUserAdmin((res) => {this.adminActive = res});
  }

  /**
   * If true, show the menu. if false, hide the menu
   */
  getConnectStatus() {
    return this.authTokenService.isTokenExpired();
  }

  closeListOnInit() {
    setTimeout(() => {
      if (this.getConnectStatus()) {
        this.onBtnSideBar();
        this.isUserAdmin();
      } else {
        this.closeListOnInit();
      }
    }, 500);
  }

  /**
   * define the icon direction on function of the screen
   */
  defineIconList() {
    if ($(window).width() > 991) {
      this.btnSideBar = this.faAngleDoubleRight;
      this.iconIn = this.faAngleDoubleRight;
      this.iconOut = this.faAngleDoubleLeft;
    } else {
      this.btnSideBar = this.faAngleDoubleUp;
      this.iconIn = this.faAngleDoubleUp;
      this.iconOut = this.faAngleDoubleDown;
    }
  }

  /**
   * icon for the button collapse
   */
  onBtnSideBar() {
    $('#sidebar').toggleClass('active');

    if (this.btnSideBar === this.iconOut) {
      this.btnSideBar = this.iconIn;
    } else {
      this.btnSideBar = this.iconOut;
    }
  }




}
