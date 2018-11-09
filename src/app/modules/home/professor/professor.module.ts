import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorComponent } from './professor.component';
import { ChallengesModule } from './challenges/challenges.module';

@NgModule({
  imports: [
    CommonModule,
    ChallengesModule
  ],
  declarations: [ProfessorComponent], 
  exports: [ProfessorComponent]
})
export class ProfessorModule { }
