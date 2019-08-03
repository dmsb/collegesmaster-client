import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-student-challenges',
  templateUrl: './student-challenges.component.html',
  styleUrls: ['./student-challenges.component.scss']
})
export class StudentChallengesComponent implements OnInit {

  @ViewChild('matPaginatorAnsweredChallenges') answeredChallengesPaginator: MatPaginator;
  @ViewChild('matSortAnsweredChallenges') answeredChallengesSort: MatSort;

  displayedColumns: string[] = ['actions', 'discipline.name',  'title'];
  lengthAnsweredChallenges : Number = 0;
  pageIndexAnsweredChallenges : Number = 0;
  pageSize : number = 2;
  
  constructor() { }

  ngOnInit() {
  }

}
