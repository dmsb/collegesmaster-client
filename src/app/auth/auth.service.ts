import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
    if(this.cookieService.get('access_token') != '') {
      alert(this.cookieService.get('access_token'));
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.cookieService.get('access_token')}`
        }
      });
    } else {
      alert(this.cookieService.get('access_token'));
    }
    return next.handle(request);
  }

  obtainAccessToken(username: string, password: string){
    let params = new URLSearchParams();
    params.append('grant_type','password');
    params.append('client_id','angular-client');
    params.append('username', username);
    params.append('password', password);
    params.append('scope','read');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa("angular-client:secret"),
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
     
    this.httpClient.post('http://localhost:4200/collegesmaster/oauth/token',
      params.toString(), httpOptions)
      .subscribe(
        data => this.saveToken(data),
        err => alert('Invalid Credentials')); 
  }
 
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    this.router.navigate(['/home']);
  }
 
  getResource(resourceUrl) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+ this.cookieService.get('access_token')})
    };

    return this.httpClient.get(resourceUrl, httpOptions);
  }
 
  checkCredentials(){
    if (this.cookieService.check('access_token')){
        this.router.navigate(['/home']);
    }
  } 
 
  logout() {
    this.cookieService.delete('access_token');
    this.router.navigate(['/login']);
  }
}
