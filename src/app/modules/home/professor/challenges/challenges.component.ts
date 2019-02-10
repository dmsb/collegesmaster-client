import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  challenges: Array<Challenge>;

  constructor(private challengeService: ChallengeService) { 
    this.challenges = new Array<Challenge>();
  }

  ngOnInit() {
    this.challengeService.getChallengesFromProfessor()
      .subscribe(
        data => this.challenges = data,
        error=> { 
          console.log("Error in recieving data: " + error); 
        });
  }

  getChallenges() {
    return this.challenges;
  }

  editChallenge(challenge: Challenge) {
    console.log(challenge.title);
  }

  removeChallenge(challengeId: number) {
    console.log(challengeId);
  }

}
