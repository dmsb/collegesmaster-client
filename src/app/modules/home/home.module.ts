import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { StudentModule } from './student/student.module';
import { ProfessorModule } from './professor/professor.module';
import { HomeRoutingModule } from '../../routings/home-routing/home-routing.module';
import { HeaderModule } from '../../core/header/header.module';
import { FooterModule } from '../../core/footer/footer.module';
import { HomeGuardService } from '../../core/guards/home-guard/home-guard.service';


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
