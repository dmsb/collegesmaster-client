import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    if (this.cookieService.get('access_token') != '') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get('access_token')}`
        }
      });
    }
    return next.handle(request);
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

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    this.router.navigate(['/home']);
  }

  getResource(resourceUrl): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.get(resourceUrl, httpOptions);
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
        'TOKEN-ID': this.cookieService.get('access_token')
      })
    };

    this.cookieService.delete('access_token');

    this.httpClient.delete('http://localhost:4200/collegesmaster/oauth/token', httpOptions)
      .subscribe(
        data => this.router.navigate(['/login']),
        err => M.toast({ html: 'Error in logout request processing', classes: 'red rounded' }));
  }
}
