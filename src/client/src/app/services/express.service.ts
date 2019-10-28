import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../guards/auth';
import {FileUploader} from 'ng2-file-upload';
import {AuthTokenService} from './auth-token.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ExpressService {

  /**
   * Define the backend port
   */
  private port = '8080';
  private domain;
  private maxFileSize = 10 * 1024 * 1024; // 10 MB
  public uploader: FileUploader;
  public allowedMimeType = ['image/png', 'image/jpg', 'application/pdf', 'image/jpeg'];

  constructor(private http: HttpClient,
              private authTokenService: AuthTokenService,
              private router: Router) {
    this.defineUrl();
  }

  /**
   * get windows location url and define this for the request post to backend
   */
  defineUrl() {
    let url = window.location.href;
    const regex = /.*.\/\/.*?\//;
    url = url.match(regex).toString();
    url = url.slice(0, -1);
    const regex2 = /(.{6}):/;
    if(url.match(regex2)){
      url = url.match(/.*:/).toString();
      url = url.slice(0, -1);
    };
    this.domain = url + ':' + this.port;
  }

  /**
   * get url
   */
  getDomain() {
      return this.domain;
  }

  /**
   * post request to express and get the response
   * @param target
   * @param contentPost
   */
  postExpress(target, contentPost) {
    contentPost.token = this.authTokenService.getToken();
    console.log(this.authTokenService.getToken())
    return this.http.post<Auth>(this.domain + '/' + target, contentPost);
  }

  /**
   * check if token is expired on server
   * @param callback
   */
  checkTokenBack(callback) {
    if (this.authTokenService.isTokenExpired()) {
      const content = {
        action: 'checkToken'
      };
      this.postExpress('user', content).subscribe((res: Auth) => {
        if (res.errorToken) {
          // this.authTokenService.clearAuthToken();
          swal('C\'est fini !', 'Votre session à expirée, veuillez vous reconnecter', 'error');
          this.router.navigate(['/login']);
          return callback(false);
        } else {
          return callback(true);
        }
      });
    }
  }

  /**
   * set the name of file before upload
   * @param fileName
   */
  setFileName(fileName) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      const fileExtension = '.' + item.file.name.split('.').pop();
      item.file.name = fileName + fileExtension;
    };
  }

  /**
   * check the File size
   * @param callback
   */
  checkFileSize(callback) {
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileSize':
          const errorMessage = 'La taille du fichier dépasse la taille maximale autorisée. <br> (' + Math.round(item.size / 1024 / 1024) + ' Mb sur ' + this.maxFileSize / 1024 / 1024 + ' Mb autorisé)';
          console.log(errorMessage);
          return callback(errorMessage);
          break;
      }
    };
  }

  /**
   * upload a file to express
   */
  uploadFile() {
    this.uploader = new FileUploader({
      url: this.domain + '/upload',
      itemAlias: 'justificatif',
      allowedMimeType: this.allowedMimeType,
      maxFileSize: this.maxFileSize
    });

  }
}
