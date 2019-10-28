import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CrudUser } from './models/cruduser.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../guards/auth';
import { AuthTokenService } from './auth-token.service';
import { ExpressService } from './express.service';


const endpoint = document.location.protocol + '//' + document.location.hostname + ':8080/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  dataChange: BehaviorSubject<CrudUser[]> = new BehaviorSubject<CrudUser[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(public toastr: ToastrService, private httpClient: HttpClient, private authTokenService: AuthTokenService, ) { }


  get data(): CrudUser[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  /** CRUD METHODS */
  getUser(): void {
    // TODO : add the ability to send a body with the token to secure
    const token = this.authTokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }), body: {token: token }
    };

    this.httpClient.get<CrudUser[]>(endpoint + 'cruduser', httpOptions).subscribe(data => {
      this.dataChange.next(data);
    },
      (err: HttpErrorResponse) => {
        this.toastr.error('Problème, aucune donnée chargée.', 'Oops!');
      });
  }


  // ADD, POST METHOD
  addUser(user: CrudUser) {
    const token = this.authTokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    const body = {user: user, token: token };
    console.log(httpOptions);
    this.httpClient.post(endpoint + 'cruduser', body, httpOptions).subscribe(data => {
      console.log(data);
      this.dialogData = user;
      this.toastr.success('Félicitation, utilisateur ajouté.', 'Success!');
    },
      (err: HttpErrorResponse) => {
        this.toastr.error('Problème, aucun utilisateur ajouté.', 'Oops!');
      });
  }
  // UPDATE, PUT METHOD
  updateUser(user: CrudUser) {
    const token = this.authTokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    const body = {user: user, token: token };
    // version from the past : avoid to have body.body
    // return this.httpClient.put(endpoint + 'cruduser', user, httpOptions).subscribe(data => {
    return this.httpClient.put(endpoint + 'cruduser', body, httpOptions).subscribe(data => {
      this.dialogData = user;
      this.toastr.success('Félicitation utilisateur édité', 'Success!');
    },
      (err: HttpErrorResponse) => {
        this.toastr.error('Problème, aucun utilisateur modifié: ' + err.name + ' ' + err.message, 'Oops');
      }
    );
  }
  // DELETE METHOD
  deleteUser(id_user: string): void {
    const token = this.authTokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { id_user: id_user['id_user'], token: token }
    };
    console.log(httpOptions);
    this.httpClient.delete<CrudUser[]>(endpoint + 'cruduser', httpOptions).subscribe(data => {
      console.log(data);
      this.toastr.success('Félicitation utilisateur supprimé', 'Success!');
    },
      (err: HttpErrorResponse) => {
        this.toastr.success('Successfully deleted', 'Success!');
      }
    );
  }
}
