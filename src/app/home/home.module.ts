import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { HomeComponent } from './home.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { StudentModule } from './student/student.module';
import { ProfessorModule } from './professor/professor.module';
import { HomeGuardService } from './home-guard/home-guard.service';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderModule,
    FooterModule,
    StudentModule,
    ProfessorModule
  ],
  declarations: [HomeComponent],
  providers: [
    HomeGuardService
  ]
})
export class HomeModule { }
