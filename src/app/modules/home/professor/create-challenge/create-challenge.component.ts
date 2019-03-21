import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/core/models/challenge/challenge';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Question } from 'src/app/core/models/challenge/question';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent implements OnInit {

  challengeToBeSaved: Challenge;

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    this.challengeToBeSaved = new Challenge();
    this.challengeToBeSaved.questions = new Array<Question>();
  }

  saveChallenge() {
    this.challengeService.saveChallenge(this.challengeToBeSaved);
  }

}
