import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Discipline } from '../models/institutes/discipline';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getDisciplinesByName(disciplineName : string) : Observable<Array<Discipline>> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    };

    return this.httpClient.
      get<Array<Discipline>>(`http://localhost:4200/collegesmaster/disciplines?sort=name,asc&name=${disciplineName}`, httpOptions);
  }
}
