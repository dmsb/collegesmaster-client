import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { CreateChallengeComponent } from './create-challenge.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ],
  declarations: [CreateChallengeComponent],
  exports: [CreateChallengeComponent]
})
export class CreateChallengeModule { }
