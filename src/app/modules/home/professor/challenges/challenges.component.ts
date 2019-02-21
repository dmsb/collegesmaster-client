import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';
import { ChallengeType } from 'src/app/core/enums/challenge-type';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['actions', 'discipline.name',  'title'];
  resultsLength : Number = 0;
  
  challenges: Array<Challenge>;
  selectedChallenge : Challenge;

  enabledOptions = [
    {id : true, value : 'Yes'},
    {id : false, value : 'No'}
  ];
  
  challengeTypeEnum = ChallengeType;

  constructor(private challengeService: ChallengeService) { 
    this.challenges = new Array<Challenge>();
    this.selectedChallenge = new Challenge();
  }

  ngOnInit() {
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.challengeService!.getChallengesFromProfessor(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          this.resultsLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.challenges = data);
  }

  loadChallenges() {
    this.challengeService.getChallengesFromProfessor(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(
        data => this.challenges = data.content,
        error=> { 
          console.log("Error in recieving data: " + error); 
        });
    this.selectedChallenge = new Challenge();
  }

  editChallenge(challenge: Challenge) {
    console.log(challenge.title);
  }

  removeChallenge(challengeId: number) {
    console.log(challengeId);
  }

  saveChallenge(selectedChallenge: Challenge) {
    
    this.challengeService.saveChallenge(selectedChallenge).subscribe(
      data => {
        this.selectedChallenge = data;
        M.toast({html: 'Challenge updated with success!', classes: 'green rounded'});
        this.closeChallengeModal();
        this.loadChallenges();
      },
      error=> { 
        M.toast({html: 'Challenge can\'t be updated. Please try again more latter.', classes: 'red rounded'});
        console.log("Error in recieving data: " + error);
      });
  }

  closeChallengeModal() {
    $('#challenge_modal').modal('close');
  }

  setSelectedChallenge(currentChallenge : Challenge) {
    this.selectedChallenge = currentChallenge;
    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });
  }
}
