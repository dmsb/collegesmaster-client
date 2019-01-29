import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';
import { Challenge } from 'src/app/core/models/challenge/challenge';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  challenges: Challenge[];

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    this.challengeService.getChallengesFromProfessor().subscribe(
      data => this.challenges = data
    );
    console.log(this.challenges);
  }

}
