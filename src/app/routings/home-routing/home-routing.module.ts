import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../modules/home/home.component';
import { HomeGuardService } from '../../core/guards/home-guard/home-guard.service';
import { ProfessorComponent } from 'src/app/modules/home/professor/professor.component';
import { ChallengesComponent } from 'src/app/modules/home/professor/challenges/challenges.component';
import { StudentComponent } from 'src/app/modules/home/student/student.component';
import { StudentChallengesComponent } from 'src/app/modules/home/student/student-challenges/student-challenges.component';


const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[HomeGuardService],
    children: [
      { path: 'professor', component: ProfessorComponent, canActivateChild:[HomeGuardService],
        children:[
          { path: 'challenges',  component: ChallengesComponent, canActivateChild:[HomeGuardService] }
        ]
      },
      { path: 'student', component: StudentComponent, canActivateChild:[HomeGuardService],
        children:[
          { path: 'challenges',  component: StudentChallengesComponent, canActivateChild:[HomeGuardService] }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
