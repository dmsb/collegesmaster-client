import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Pageable } from '../models/generic/pageable/pageable';
import { AnswerBook } from '../models/answer-book/answer-book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerBookService {

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

    getAnsweredBooksByStudent(sort: string, order: string, page: number, size : number) : Observable<Pageable<AnswerBook>> {
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.cookieService.get('access_token')
        })
      };
  
      return this.httpClient.
        get<Pageable<AnswerBook>>(environment.apiHost + `answer_books_by_logged_student?sort=${sort},${order}&page=${page}&size=${size}`, httpOptions);
    }
}
