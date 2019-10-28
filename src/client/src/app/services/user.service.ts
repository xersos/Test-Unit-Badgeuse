import { Injectable } from '@angular/core';
import {ExpressService} from './express.service';
import {Auth} from '../guards/auth';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthTokenService} from './auth-token.service';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    user;

    constructor(private authTokenService: AuthTokenService,
                private router: Router,
                private expressService: ExpressService) { }


    /**
     * get only the id of user
     * @param callback
     * @param userName
     */
    getIdUser(callback, userName?) {
        if (userName === undefined) {
            const token = this.authTokenService.decodeToken();
            return callback(token.id_user);
        } else {
            const content = {
                action: 'getIdUser',
                userName: userName
            };
            this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                if (!res.success) {
                    swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                } else {
                    return callback(res.user);
                }
            });
        }
    }

    /**
     * get all data of user conected
     * @param callback
     * @param id_user
     */
    getDataUser(callback, id_user?) {
        console.log('user :', this.user)
        if (this.user === undefined || this.user === null || id_user) {
            // this.expressService.checkTokenBack((isOk) => {
            //     if (isOk) {

                    const token = this.authTokenService.decodeToken();
                    console.log('getDataUser ' + token);

                    if (token === null) {
                        return callback(false);
                    } else {

                        if (id_user === undefined) {
                            id_user = token.id_user;
                        }

                        const content = {
                            action: 'getDataUser',
                            id_user: id_user
                        };
                        this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                            if (!res.success) {
                                swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                            } else {
                                this.user = res.user;
                                return callback(this.user);
                            }
                        });
                    }
                // } else{
                //     return callback(false);
                // }
            // });
        } else {
            return callback(this.user);
        }
    }

    /**
     * get all data of user conected
     * @param callback
     * @param id_user
     * @param startDate
     * @param endDate
     */
    getPieChart(callback, id_user?, startDate?, endDate?) {
        // this.expressService.checkTokenBack((isOk) => {
        //     if (isOk) {

                const token = this.authTokenService.decodeToken();

                if (token === null) {
                    return callback('token is null');
                } else {

                    if (id_user === undefined) {
                        id_user = token.id_user;
                    }
                    if (startDate === undefined) {
                        startDate = new Date();
                    }
                    if (endDate === undefined) {
                        endDate = new Date();
                    }

                    const content = {
                        action: 'getPieChart',
                        id_user: id_user,
                        startDate: startDate,
                        endDate: endDate
                    };
                    this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                        if (!res.success) {
                            swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                            return callback('error in the reading of userService.getPieChart data', [], []);
                        } else {
                            return callback(null, res.pieData, res.pieReason);
                        }
                    });
                }
            // }
        // });
    }

    /**
     * get all data of user conected
     * @param callback
     */
    getPieChartAdmin(callback, StartDate?, EndDate?) {
        this.expressService.checkTokenBack((isOk) => {
            if(isOk) {

                const token = this.authTokenService.decodeToken();

                if (token === null) {
                    return callback(false);
                } else {

                    if (StartDate === undefined) {
                        StartDate = new Date();
                    }
                    if (EndDate === undefined) {
                        EndDate = new Date();
                    }


                    const content = {
                        action: 'getPieChartAdmin',
                        StartDate: StartDate,
                        EndDate: EndDate
                    };
                    this.expressService.postExpress('user', content).subscribe((res: Auth) => {
                        if (!res.success) {
                            swal('Oups !', 'Une erreur est survenue lors de la requête vers la base de données.', 'error');
                            return callback('error in the reading of userService.getPieChartAdmin data', [], []);
                        } else {
                            return callback(null, res.PieData, res.PieReason);
                        }
                    });
                }
            }
        });
    }

    /**
     * check if the user connected is administrator
     * @param callback
     */
    isUserAdmin(callback) {
        this.getDataUser((user) => {
            // activate administrator access if role = 3
            if (user.id_role === 3) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }


}

