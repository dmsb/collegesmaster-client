import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { UpdateChallengeComponent } from './update-challenge/update-challenge.component';
import { DeleteChallengeComponent } from './delete-challenge/delete-challenge.component';
import { ChallengesComponent } from './challenges.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CreateChallengeComponent, UpdateChallengeComponent, DeleteChallengeComponent, ChallengesComponent],
  exports: [ChallengesComponent]
})
export class ChallengesModule { }
