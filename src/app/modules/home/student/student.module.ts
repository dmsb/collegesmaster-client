import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentChallengesComponent } from './student-challenges/student-challenges.component';
import { StudentChallengesModule } from './student-challenges/student-challenges.module';

@NgModule({
  imports: [
    CommonModule,
    StudentChallengesModule
  ],
  declarations: [StudentComponent],
  exports: [StudentChallengesComponent]
})
export class StudentModule { }
