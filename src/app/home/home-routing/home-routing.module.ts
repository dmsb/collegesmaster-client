import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home.component';
import { HomeGuardService } from '../home-guard/home-guard.service';

const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[HomeGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
