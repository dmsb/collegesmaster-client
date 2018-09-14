import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.checkCredentials()) {

    }
    $(document).ready(function(){
      $('.parallax').parallax();
    });
        
  }

  obtainAccessToken(): void {
    this.loginService.obtainAccessToken(this.username, this.password);
  }

}
