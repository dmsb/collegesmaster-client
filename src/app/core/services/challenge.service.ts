import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Challenge } from '../models/challenge/challenge';
import { Observable } from 'rxjs';
import { Pageable } from '../models/generic/pageable/pageable';
import { Question } from '../models/challenge/question';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getChallengesFromProfessor(sort: string, order: string, page: number, size : number) : Observable<Pageable<Challenge>> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.
      get<Pageable<Challenge>>(`http://localhost:4200/collegesmaster/challenges?sort=${sort},${order}&page=${page}&size=${size}`, httpOptions);
  }

  getQuestionsByChallenge(challengeId : number, sort: string, order: string, page: number, size : number) : Observable<Pageable<Question>> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.
      get<Pageable<Question>>(`http://localhost:4200/collegesmaster/challenges/questions?challenge_id=${challengeId}&sort=${sort},${order}&page=${page}&size=${size}`, httpOptions);
  }

  saveChallenge(unsavedChallenge : Challenge) : Observable<Challenge> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.
      put<Challenge>('http://localhost:4200/collegesmaster/challenges/' + unsavedChallenge.id, unsavedChallenge, httpOptions);
  }
}
