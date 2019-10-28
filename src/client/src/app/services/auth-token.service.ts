import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private authToken;

  constructor() {
    this.authToken = localStorage.getItem('token');
  }

  /**
   * set the token parameter of user connected
   * @param token
   */
  setAuthToken(token) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  /**
   * get Token encrypt
   */
  getToken() {
    return this.authToken;
  }

  /**
   * remove token
   */
  clearAuthToken() {
    this.authToken = null;
    localStorage.clear();
  }

  /**POST
   * check if token is expired
   */
  isTokenExpired() {
    return !helper.isTokenExpired(this.authToken);
  }

  /**
   * get token decoded
   */
  decodeToken() {
    return helper.decodeToken(this.authToken);
  }
}
