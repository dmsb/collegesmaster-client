import { Component, OnInit } from '@angular/core';
import { ChallengeService } from 'src/app/core/services/challenge.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    this.challengeService.getChallengesFromProfessor();
  }

}
