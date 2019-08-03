import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { StudentChallengesModule } from './student-challenges/student-challenges.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    StudentChallengesModule,
    RouterModule
  ],
  declarations: [StudentComponent],
  exports: [StudentComponent]
})
export class StudentModule { }
