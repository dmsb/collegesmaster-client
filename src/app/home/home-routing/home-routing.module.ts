import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrossGraphicsComponent } from '../cross-graphics/cross-graphics.component';
import { HomeComponent } from '../home.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: 'cross-graphics', component: CrossGraphicsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
