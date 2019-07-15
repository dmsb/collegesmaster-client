import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  protected page: string;
  
  constructor(protected loginServices: AuthService, 
              protected cookieService : CookieService,
              protected router: Router) { }

  ngOnInit() { }

  logout() {
    this.loginServices.logout();
  }

  getLoggedUser() {
    return JSON.parse(this.cookieService.get("logged_user"));
  }

  choose(page: string) {
    const loggedUserRoleName : String = this.getLoggedUser().roles[0].name;
    this.router.navigate(['/home/' + loggedUserRoleName.toLowerCase() + '/' + page]);
  }

}
