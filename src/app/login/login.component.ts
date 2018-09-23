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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('.progress').hide();
      $('.parallax').parallax();
    });
        
  }

  async obtainAccessToken() {
    $('.progress').show();
    await new Promise((resolve) => setTimeout(resolve, 700));
    this.authService.obtainAccessToken(this.username, this.password);
    $('.progress').hide();
  }

}
