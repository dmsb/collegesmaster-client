import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { UpdateChallengeComponent } from './update-challenge/update-challenge.component';
import { DeleteChallengeComponent } from './delete-challenge/delete-challenge.component';
import { ChallengesComponent } from './challenges.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ],
  declarations: [CreateChallengeComponent, UpdateChallengeComponent, DeleteChallengeComponent, ChallengesComponent],
  exports: [ChallengesComponent]
})
export class ChallengesModule { }
