import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../../modules/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', redirectTo: ''},
  { path: 'home', loadChildren: '../../modules/home/home.module#HomeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}