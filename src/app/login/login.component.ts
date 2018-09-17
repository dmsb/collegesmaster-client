import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: AuthService) { }

  ngOnInit() {
    this.loginService.checkCredentials();

    $(document).ready(function(){
      $('.parallax').parallax();
    });
        
  }

  obtainAccessToken(): void {
    this.loginService.obtainAccessToken(this.username, this.password);
  }

}
