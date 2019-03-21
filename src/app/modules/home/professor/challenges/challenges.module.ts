import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { MatTableModule, MatCardModule, MatSortModule, 
  MatInputModule, MatSelectModule, MatFormFieldModule, 
  MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, 
  MatProgressSpinnerModule, MatPaginatorModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,

    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatAutocompleteModule,
    MatPaginatorModule
    
  ],
  declarations: [ChallengesComponent],
  exports: [ChallengesComponent]
})
export class ChallengesModule { }
