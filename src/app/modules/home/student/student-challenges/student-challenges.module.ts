import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentChallengesComponent } from './student-challenges.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatCardModule, MatSortModule, 
  MatInputModule, MatSelectModule, MatFormFieldModule, 
  MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, 
  MatProgressSpinnerModule, MatPaginatorModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    
    FormsModule,
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
  declarations: [StudentChallengesComponent],
  exports: [StudentChallengesComponent]
})
export class StudentChallengesModule { }
