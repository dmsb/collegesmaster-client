import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { User } from '../models/security/user';
declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  username: string;
  password: string;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.buildRequestWithAuthenticationToken(request);

    return next.handle(request)
    .pipe(catchError((error : HttpErrorResponse, caught) => {
      switch (error.status) {
        case 400 :
          for(let index in error.error) {
            if(error.error[index] == 'invalid_grant') {
              this.logout();
              break;
            }
            M.toast({ html: error.error[index], classes: 'red rounded' })
          }
          break;
        case 401 :
          return this.obtainAccessTokenByRefreshToken()
          .pipe(
            switchMap((token: any) => {
              this.saveToken(token);
              return next.handle(this.buildRequestWithAuthenticationToken(request));
            })
          );
        case 500 :
          return of(error);
        default :
          return of(error);
      }
    }));
  }

  buildRequestWithAuthenticationToken(request) {
    if (this.cookieService.check('access_token')) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get('access_token')}`
        }
      });
    } else {
      return request;
    }
  }
  
  obtainAccessToken(username: string, password: string) {

    if (this.cookieService.check('access_token')) {
      this.cookieService.delete('access_token');
    }

    let params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', 'angular-client');
    params.append('username', username);
    params.append('password', password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa("angular-client:secret"),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.httpClient.post('http://localhost:4200/collegesmaster/oauth/token',
      params.toString(), httpOptions)
      .subscribe(
        data => this.saveToken(data),
        err => M.toast({ html: 'Invalid credentials!', classes: 'blue rounded' }));

  }

  obtainAccessTokenByRefreshToken() {
    
    let params = new URLSearchParams();
    params.append('client_id', 'angular-client');
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', this.cookieService.get('refresh_token'));

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa("angular-client:secret"),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.httpClient.post(`http://localhost:4200/collegesmaster/oauth/token`,
      params.toString(), httpOptions);
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, new Date(expireDate));
    this.cookieService.set("refresh_token", token.refresh_token);
    this.getUserAuthorities(expireDate);
  }

  getUserAuthorities(expireDate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    this.httpClient.get<User>('http://localhost:4200/collegesmaster/users/logged_user_roles', httpOptions).subscribe(
      data => {
        let loggedUser : User = data;
        const loggedUserRoles = loggedUser.roles;
        if(loggedUserRoles.length > 1) {
          //implementar tratamento para aluno/monitor
        } else {
          const role: string = loggedUserRoles[0].name;
          this.router.navigate(['/home/'+ role.toLowerCase() +'/challenges']);
        }
        this.cookieService.set("logged_user", JSON.stringify(loggedUser), expireDate);
        this.cookieService.set("user_authorities", loggedUserRoles.toString(), expireDate);
        
      },
      error =>  M.toast({ html: 'Error in login request processing', classes: 'red rounded' })
    );
  }

  checkCredentials(): boolean {
    if (!this.cookieService.check('access_token')) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa("angular-client:secret"),
        'TOKEN-ID': this.cookieService.get('access_token'),
        'REFRESH-TOKEN-ID': this.cookieService.get('refresh_token')
      })
    };

    this.cookieService.delete('access_token');
    this.cookieService.delete('user_authorities');

    this.httpClient.delete('http://localhost:4200/collegesmaster/oauth/token', httpOptions)
      .subscribe(
        data => this.router.navigate(['/login']),
        err => M.toast({ html: 'Error in logout request processing', classes: 'red rounded' }));
  }
}
