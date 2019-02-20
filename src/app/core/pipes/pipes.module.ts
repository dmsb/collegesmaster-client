import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumToArrayPipe } from './enum-to-array.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EnumToArrayPipe],
  exports:      [EnumToArrayPipe]
})
export class PipesModule { }
