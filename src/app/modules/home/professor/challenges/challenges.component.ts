import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';
import { ChallengeType } from 'src/app/core/enums/challenge-type';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, of as observableOf, Observable} from 'rxjs';
import {catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import { Discipline } from 'src/app/core/models/institutes/discipline';
import { DisciplineService } from 'src/app/core/services/discipline.service';
import { FormControl } from '@angular/forms';
import { Question } from 'src/app/core/models/challenge/question';
import { Alternative } from 'src/app/core/models/challenge/alternative';

declare var $: any;
declare var M: any;

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit, AfterViewInit {
  
  @ViewChild('matPaginatorChallenges') challengesPaginator: MatPaginator;
  @ViewChild('matSortChallenges') challengesSort: MatSort;

  displayedColumns: string[] = ['actions', 'discipline.name',  'title'];
  resultsLength : Number = 0;

  @ViewChild('matPaginatorQuestions') questionsPaginator: MatPaginator;
  @ViewChild('matSortQuestions') questionsSort: MatSort;

  displayedQuestionColumns: string[] = ['actions', 'description', 'score'];
  resultsQuestionLength : Number = 0;
  
  displayedAlternativeColumns: string[] = ['actions', 'description', 'isTrue'];

  myControl: FormControl;
  filteredDisciplines: Observable<Discipline[]>;

  challenges: Array<Challenge>;
  selectedChallenge : Challenge;
  selectedQuestion : Question;
  selectedAlternative : Alternative;

  enabledOptions = [
    {id : true, value : 'Yes'},
    {id : false, value : 'No'}
  ];
  
  challengeTypeEnum = ChallengeType;

  constructor(private challengeService: ChallengeService, 
              private disciplineService: DisciplineService) { 
    this.challenges = new Array<Challenge>();
    this.selectedChallenge = new Challenge();
    this.selectedChallenge.discipline = new Discipline();
    this.selectedQuestion = new Question();
    this.selectedAlternative = new Alternative();
    this.myControl = new FormControl();
  }

  ngOnInit() {
    
    this.filteredDisciplines = this.myControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(disciplineName => typeof(disciplineName) === 'string'),
        switchMap(disciplineName => 
          this.disciplineService.getDisciplinesByName(disciplineName)));
    $(document).ready(function(){
      $('.modal').modal({
        dismissible : false
      });
    });
     
  }

  ngAfterViewInit() {
    this.challengesSort.sortChange.subscribe(() => this.challengesPaginator.pageIndex = 0);
    merge(this.challengesSort.sortChange, this.challengesPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.challengeService!.getChallengesByProfessor(
            this.challengesSort.active, this.challengesSort.direction,
            this.challengesPaginator.pageIndex, this.challengesPaginator.pageSize);
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

  displayFn(discipline?: Discipline): string | undefined {
    if (discipline) return discipline.name;
  }

  loadChallenges() {
    this.challengeService.getChallengesByProfessor(this.challengesSort.active, this.challengesSort.direction,
      this.challengesPaginator.pageIndex, this.challengesPaginator.pageSize)
      .subscribe(
        data => {
          this.challenges = data.content;
          this.challenges.forEach(function (challenge) {
            if(challenge.id == this.selectedChallenge.id) {
              this.selectedChallenge = challenge;
            }
          })
        },
        error=> { 
          console.log("Error in recieving data: " + error); 
        });
  }

  saveChallenge(selectedChallenge: Challenge,  modalType: string) {
    
    this.challengeService.saveChallenge(selectedChallenge).subscribe(
      data => {
        this.selectedChallenge = data;
        M.toast({html: 'Challenge updated with success!', classes: 'green rounded'});
        this.loadChallenges();
        switch(modalType) {
          case "challenge" :
            this.closeChallengeModal();
            break;
          case "question" :
            this.closeQuestionModal();
            break;
          case "alternative" :
            this.closeAlternativeModal();
            break;
        }
      },
      error=> { 
        M.toast({html: 'Challenge can\'t be updated. Please try again more latter.', classes: 'red rounded'});
        console.log("Error in recieving data: " + error);
      });
  }

  closeAlternativeModal(){
    $('#alternative_modal').modal('close');
  }

  closeQuestionModal(){
    $('#question_modal').modal('close');
  }

  closeChallengeModal() {
    $('#challenge_modal').modal('close');
    this.loadChallenges();
  }

  setSelectedAlternative(currentAlternative : Alternative) {
    this.selectedAlternative = currentAlternative;

    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });
  }

  setSelectedQuestion(currentQuestion : Question) {
    this.selectedQuestion = currentQuestion;
    
    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });

    this.challengeService.getAlternativesByQuestion(this.selectedQuestion.id).subscribe(
      data => this.selectedQuestion.alternatives = data
    )
  }
  
  setSelectedChallenge(currentChallenge : Challenge) {
    this.selectedChallenge = currentChallenge;
    
    this.myControl.setValue(this.selectedChallenge.discipline);
    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });

    this.questionsSort.sortChange.subscribe(() => this.questionsPaginator.pageIndex = 0);
      merge(this.questionsSort.sortChange, this.questionsPaginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.challengeService!.getQuestionsByChallenge(
            this.selectedChallenge.id, this.questionsSort.active, this.questionsSort.direction, 
            this.questionsPaginator.pageIndex, this.questionsPaginator.pageSize);
        }),
        map(data => {
          this.resultsQuestionLength = data.totalElements;
          return data.content;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe(data => this.selectedChallenge.questions = data);
  }
  
  selectDiscipline(selectedDiscipline : Discipline) {
    this.selectedChallenge.discipline = selectedDiscipline;
  }
}
