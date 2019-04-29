import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';
import { ChallengeType } from 'src/app/core/enums/challenge-type';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, of as observableOf, Observable, of} from 'rxjs';
import {catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import { Discipline } from 'src/app/core/models/institutes/discipline';
import { DisciplineService } from 'src/app/core/services/discipline.service';
import { FormControl } from '@angular/forms';
import { Question } from 'src/app/core/models/challenge/question';
import { Alternative } from 'src/app/core/models/challenge/alternative';
import { ChallengeStatus } from 'src/app/core/enums/challenge-status';
import { Pageable } from 'src/app/core/models/generic/pageable/pageable';
import { Letter } from 'src/app/core/enums/letter';

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
  
  displayedAlternativeColumns: string[] = ['actions', 'letter', 'description', 'isTrue'];

  myControl: FormControl;
  filteredDisciplines: Observable<Discipline[]>;

  challenges: Array<Challenge>;
  selectedChallenge : Challenge;
  selectedQuestion : Question;
  selectedAlternative : Alternative;

  editingAnewQuestion : Boolean;
  editingAnewAlternative : Boolean;

  enabledOptions = [
    {id : true, value : 'Yes'},
    {id : false, value : 'No'}
  ];
  
  challengeTypeEnum = ChallengeType;

  constructor(private challengeService: ChallengeService, 
              private disciplineService: DisciplineService) { 
    this.challenges = new Array<Challenge>();
    this.selectedChallenge = new Challenge();
    this.selectedChallenge.challengeStatus = ChallengeStatus.CREATED;
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

  loadChallenges() {
    this.challengeService.getChallengesByProfessor(this.challengesSort.active, this.challengesSort.direction,
      this.challengesPaginator.pageIndex, this.challengesPaginator.pageSize)
      .subscribe(
        data => {
          this.challenges = data.content;
          this.selectedChallenge = this.challenges.find(challenge => challenge.id == this.selectedChallenge.id);
        },
        error=> { 
          console.log("Error in recieving data: " + error); 
        });
  }

  displayFn(discipline?: Discipline): string | undefined {
    if (discipline) return discipline.name;
  }

  instantiateNewChallenge() {
    this.selectedChallenge = new Challenge();
    this.selectedChallenge.challengeStatus = 'CREATED' as any;
    this.selectedQuestion = new Question();
    this.selectedAlternative = new Alternative();

    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });
  }

  instantiateNewQuestion() {
    if(this.selectedChallenge.questions == null){
      this.selectedChallenge.questions = new Array<Question>();
    }
    this.selectedQuestion = new Question();
    this.editingAnewQuestion = true;
  }

  instantiateNewAlternative() {
    if(this.selectedQuestion.alternatives == null){
      this.selectedQuestion.alternatives = new Array<Alternative>();
    }
    this.selectedAlternative = new Alternative();
    this.selectedAlternative.letter = Letter[`${this.selectedQuestion.alternatives.length}`];
    this.editingAnewAlternative = true;
  }

  updateQuestionList() {

    if(this.selectedChallenge.questions != null && this.selectedQuestion.id == null && this.editingAnewQuestion){
      this.selectedChallenge.questions = this.selectedChallenge.questions.concat([this.selectedQuestion]);

      this.questionsSort.sortChange.subscribe(() => this.questionsPaginator.pageIndex = 0);
      merge(this.questionsSort.sortChange, this.questionsPaginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            return of(this.selectedChallenge.questions);
          }),
          map(data => {
            this.resultsQuestionLength = data.length;
            return data;
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(() => this.closeQuestionModal());
    } else {
      this.closeQuestionModal();
    }
  }

  updateAlternativeList() {

    if(this.selectedQuestion.alternatives != null && this.selectedAlternative.id == null && this.editingAnewAlternative){
      this.selectedQuestion.alternatives = this.selectedQuestion.alternatives.concat([this.selectedAlternative]);
    }
    this.closeAlternativeModal();
  }

  setSelectedAlternative(currentAlternative : Alternative) {
    this.selectedAlternative = currentAlternative;

    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });
    this.editingAnewAlternative = false;
  }

  setSelectedQuestion(currentQuestion : Question) {
    this.selectedQuestion = currentQuestion;
    
    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });

    if(this.selectedQuestion.id != null) {
      this.challengeService.getAlternativesByQuestion(this.selectedQuestion.id).subscribe(
        data => this.selectedQuestion.alternatives = data
      )
    }
    this.editingAnewQuestion = false;
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

  saveChallenge(modalType: string) {
    
    this.challengeService.saveChallenge(this.selectedChallenge)
    .subscribe(
      data => {
        this.selectedChallenge = data;
        M.toast({html: 'Challenge updated with success!', classes: 'green rounded'});
        switch(modalType) {
          case "challenge" :
            $('#challenge_modal').modal('close');
            break;
          case "question" :
            this.closeQuestionModal();
            break;
          case "alternative" :
            this.closeAlternativeModal();
            break;
        }
      },
      error => {
        M.toast({html: 'Challenge can\'t be updated. Please try again more latter.', classes: 'red rounded'});
        console.log("Error in recieving data: " + error);
      },
      () => {
        this.loadChallenges();
      });
  }

  selectDiscipline(selectedDiscipline : Discipline) {
    this.selectedChallenge.discipline = selectedDiscipline;
  }

  closeAlternativeModal(){
    $('#alternative_modal').modal('close');
  }

  closeQuestionModal(){
    $('#question_modal').modal('close');
  }

  closeChallengeModal() {
    $('#challenge_modal').modal('close');
  }

}
