import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';
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

  constructor(private challengeService: ChallengeService) { 
    this.challenges = new Array<Challenge>();
    this.selectedChallenge = new Challenge();
  }

  ngOnInit() {

    this.challengeService.getChallengesFromProfessor()
      .subscribe(
        data => this.challenges = data,
        error=> { 
          console.log("Error in recieving data: " + error); 
        });

    $(document).ready(function(){
      $('.modal').modal();
    });
  }

  editChallenge(challenge: Challenge) {
    console.log(challenge.title);
  }

  removeChallenge(challengeId: number) {
    console.log(challengeId);
  }

  setSelectedChallenge(selectedChallenge : Challenge) {
    this.selectedChallenge = selectedChallenge;
    $(document).ready(function(){
      M.updateTextFields();
    });
  }
}
