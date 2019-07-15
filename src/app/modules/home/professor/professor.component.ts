import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';

declare var $: any;

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent extends HomeComponent implements OnInit {

  @Input("page") 
  page: string;

  ngOnInit() {
    $('.dropdown-trigger').dropdown({
      constrainWidth: true,
      hover: true, // Activate on hover
      coverTrigger: false // Show list bollow the trigger
    });
    this.page = 'challenges';
  }

}
