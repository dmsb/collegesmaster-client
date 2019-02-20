import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';
import { ChallengeType } from 'src/app/core/enums/challenge-type';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

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
    this.refreshChallenges();
    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  refreshChallenges() {
    this.challengeService.getChallengesFromProfessor()
      .subscribe(
        data => this.challenges = data,
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
        $('#challenge_modal').modal('close');
        this.refreshChallenges();
      },
      error=> { 
        M.toast({html: 'Challenge can\'t be updated. Please try again more latter.', classes: 'red rounded'});
        console.log("Error in recieving data: " + error);
      });
  }

  setSelectedChallenge(selectedChallenge : Challenge) {
    this.selectedChallenge = selectedChallenge;
    $(document).ready(function(){
      M.updateTextFields();
      $('select').formSelect();
    });
  }
}
