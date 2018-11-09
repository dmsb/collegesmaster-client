import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate, CanActivateChild {

  constructor(private cookieService: CookieService,
              private router: Router) { }

  //The ActivatedRouteSnapshot contains the future route that will be activated and 
  //the RouterStateSnapshot contains the future RouterState of the application, 
  //should you pass through the guard check.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.cookieService.check('access_token')) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
