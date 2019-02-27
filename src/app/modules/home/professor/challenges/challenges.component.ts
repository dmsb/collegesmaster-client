import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';
import { ChallengeType } from 'src/app/core/enums/challenge-type';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, of as observableOf, pipe, Observable} from 'rxjs';
import {catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import { Discipline } from 'src/app/core/models/institutes/discipline';
import { DisciplineService } from 'src/app/core/services/discipline.service';
import { FormControl } from '@angular/forms';

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
  
  myControl: FormControl;
  filteredDisciplines: Observable<Discipline[]>;

  challenges: Array<Challenge>;
  selectedChallenge : Challenge;

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

  displayFn(discipline?: Discipline): string | undefined {
    if (discipline) return discipline.name;
  }

  loadChallenges() {
    this.challengeService.getChallengesFromProfessor(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(
        data => {
          this.challenges = data.content;
        },
        error=> { 
          console.log("Error in recieving data: " + error); 
        });
    this.selectedChallenge = new Challenge();
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
    this.loadChallenges();
  }

  setSelectedChallenge(currentChallenge : Challenge) {
    this.selectedChallenge = currentChallenge;
    this.myControl.setValue(this.selectedChallenge.discipline);
    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });
  }
  
  selectDiscipline(selectedDiscipline : Discipline) {
    this.selectedChallenge.discipline = selectedDiscipline;
  }
}
