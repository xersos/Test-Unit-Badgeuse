import { Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private user: string;

    constructor(private authTokenService: AuthTokenService) {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    /**
     * We use this method to record the information of the connected user.
     * @param token
     * @param user
     */
     storeUserData (token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authTokenService.setAuthToken(token);
        this.user = user;
    }


    /**
     * We disconnect the user
     */
    logout() {
        this.authTokenService.clearAuthToken();
        this.user = null;
    }
}
