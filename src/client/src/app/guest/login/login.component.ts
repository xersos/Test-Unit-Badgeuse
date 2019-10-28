import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginService} from '../../services/login.service';
import {AuthGuard} from '../../guards/auth.guard';
import {ExpressService} from '../../services/express.service';
import {Auth} from '../../guards/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/base.guest.css']
})

export class LoginComponent implements OnInit {

  processing = false;
  formLogin: FormGroup;
  previousUrl;

  constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private expressService: ExpressService,
      private router: Router,
      private authGuard: AuthGuard
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.notAuth();
  }


  /**
   * swal alert if redirectUrl
   */
  notAuth() {
    if (this.authGuard.redirectUrl) {
      swal('Authentification requise !', 'Vous devez vous connecter pour accéder à cette page.', 'error');
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  /**
   * create the login form
   */
  createForm() {
    this.formLogin = this.formBuilder.group({
      userMail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * disable the form
   */
  disableForm() {
    this.formLogin.controls['userMail'].disable();
    this.formLogin.controls['password'].disable();
  }

  /**
   * enable the form
   */
  enableForm() {
    this.formLogin.controls['userMail'].enable();
    this.formLogin.controls['password'].enable();
  }

  /**
   * when we submit the form
   */
  onLoginSubmit() {
    // the modal swal parameter
    const toast = swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      timer: 3000
    });

    this.processing = true;
    this.disableForm();

    // variable for express
    const content = {
      action: 'tryConnect',
      userMail: this.formLogin.get('userMail').value,
      password: this.formLogin.get('password').value
    };
    // express request
    console.log('GET LOGIN')
    this.expressService.postExpress('login', content).subscribe((resp: Auth ) => {
      console.log('RECIEVE LOGIN')
      if (!resp.success) {
        this.processing = false;
        swal('Connexion échouée', resp.message, 'error');
        this.enableForm();
      } else {
        this.loginService.storeUserData(resp.token, resp.user);

        // the modal success
        toast({
          type: 'success',
          title: 'Authentification réussie !'
        });

        // redirection
        if (this.previousUrl) {
          this.router.navigate([this.previousUrl]);
        } else {
          this.router.navigate(['/userSpace']);
        }
      }
    });
  }

}
