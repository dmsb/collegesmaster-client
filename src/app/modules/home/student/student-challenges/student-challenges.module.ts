import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentChallengesComponent } from './student-challenges.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StudentChallengesComponent],
  exports: [StudentChallengesComponent]
})
export class StudentChallengesModule { }
