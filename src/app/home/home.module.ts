import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { CrossGraphicsModule } from './cross-graphics/cross-graphics.module';
import { ChallengeModule } from './challenge/challenge.module';
import { HomeComponent } from './home.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CrossGraphicsModule,
    ChallengeModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
