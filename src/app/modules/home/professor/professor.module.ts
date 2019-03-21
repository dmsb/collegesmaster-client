import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorComponent } from './professor.component';
import { ChallengesModule } from './challenges/challenges.module';
import { RouterModule } from '@angular/router';
import { CreateChallengeModule } from './create-challenge/create-challenge.module';

@NgModule({
  imports: [
    CommonModule,
    ChallengesModule,
    CreateChallengeModule,
    RouterModule
  ],
  declarations: [ProfessorComponent], 
  exports: [ProfessorComponent]
})
export class ProfessorModule { }
