import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthTokenService} from "../services/auth-token.service";


@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {

  constructor(
      private authTokenService: AuthTokenService,
      private router: Router
  ) { }

  /**
   * when user is connected, redirect to Home page
   */
  canActivate() {
    if (this.authTokenService.isTokenExpired()) {
      this.router.navigate(['/userSpace']);
      return false;
    } else {
      return true;
    }
  }
}
