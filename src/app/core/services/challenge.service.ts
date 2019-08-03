import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Challenge } from '../models/challenge/challenge';
import { Observable } from 'rxjs';
import { Pageable } from '../models/generic/pageable/pageable';
import { Question } from '../models/challenge/question';
import { Alternative } from '../models/challenge/alternative';
import { environment } from 'src/environments/environment';

declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  
  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }
  
  buildOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };
    return httpOptions;
  }
  
  getChallengesByProfessor(sort: string, order: string, page: number, size : number) : Observable<Pageable<Challenge>> {
    return this.httpClient.
      get<Pageable<Challenge>>(environment.apiHost + `challenges?sort=${sort},${order}&page=${page}&size=${size}`, this.buildOptions());
  }

  getQuestionsByChallenge(challengeId : number, sort: string, order: string, page: number, size : number) : Observable<Pageable<Question>> {
    return this.httpClient.
      get<Pageable<Question>>(environment.apiHost + `challenges/questions?challenge_id=${challengeId}&sort=${sort},${order}&page=${page}&size=${size}`, this.buildOptions());
  }

  getAlternativesByQuestion(questionId : number) : Observable<Array<Alternative>> {
    return this.httpClient.
      get<Array<Alternative>>(environment.apiHost + `challenges/questions/alternatives?question_id=${questionId}`, this.buildOptions());
  }

  saveChallenge(unsavedChallenge : Challenge) : Observable<Challenge> {
    if(unsavedChallenge.id == null) {
      return this.httpClient.
        post<Challenge>(environment.apiHost + `challenges/`, unsavedChallenge, this.buildOptions());
    } else {
      return this.httpClient.
        put<Challenge>(environment.apiHost + `challenges/` + unsavedChallenge.id, unsavedChallenge, this.buildOptions());
    }
  }

  removeChallenge(challengeId : Number) : Observable<Object> {
    if(challengeId) {
      return this.httpClient.delete(environment.apiHost + `challenges/` + challengeId.valueOf(), this.buildOptions());
    }
  }

  getAssignedChallengesToLoggedStudent() : Observable<Pageable<Challenge>> {
    
    return null;
  } 
}
