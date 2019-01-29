import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Challenge } from '../models/challenge/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getChallengesFromProfessor() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.get<Challenge[]>('http://localhost:4200/collegesmaster/challenges',
      httpOptions);
  }
}
