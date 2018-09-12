import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { CrossGraphicsModule } from './cross-graphics/cross-graphics.module';
import { ChallengeModule } from './challenge/challenge.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CrossGraphicsModule,
    ChallengeModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
