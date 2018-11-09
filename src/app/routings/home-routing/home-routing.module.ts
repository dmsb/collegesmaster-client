import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../modules/home/home.component';
import { HomeGuardService } from '../../core/guards/home-guard/home-guard.service';

const homeRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[HomeGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
