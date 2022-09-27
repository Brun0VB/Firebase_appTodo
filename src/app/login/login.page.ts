import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public ngFireAuth: AngularFireAuth,
  ) {this.userData = JSON.parse(localStorage.getItem('user'));
  console.log(this.userData)
  }
  userData: any;
  ngOnInit() {}
  logIn(email, password) {
    
    this.authService.SignIn(email.value, password.value).then((res) => {
        if(this.userData.emailVerified) {
          this.router.navigate(['dashboard']);          
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}