import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {JwtHelperService} from "@auth0/angular-jwt";
import swal from "sweetalert2";
import {AuthTokenService} from "../services/auth-token.service";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  redirectUrl;

  constructor(private authTokenService: AuthTokenService,
              private router: Router) { }

  /**
   * When user is disconnected, redirect to Login page
   * When user is not administrator, redirect to User space page
   * @param router
   * @param state
   */
  canActivate (router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authTokenService.isTokenExpired()) {

      const token = helper.decodeToken(this.authTokenService.getToken());
      const regexUrl = /^\/admin$|^\/hebdo$|^\/userDetail|^\/absence$/;

      if (regexUrl.test(state.url)) {
        if (token.admin === true) {
          return true;
        } else {
          swal('Acces non autorisé', 'Vous n\'avez pas les droits pour accéder à cette page', 'error');
          this.router.navigate(['userSpace']);
        }
      } else {
        return true;
      }

    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['login']);
    }
  }
}
