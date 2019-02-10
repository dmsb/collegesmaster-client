import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Challenge } from '../models/challenge/challenge';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getChallengesFromProfessor() : Observable<Array<Challenge>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.
      get<Array<Challenge>>('http://localhost:4200/collegesmaster/challenges', httpOptions);
  }
}
