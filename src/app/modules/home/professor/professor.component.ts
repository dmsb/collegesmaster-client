import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';

declare var $: any;

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  constructor(private loginServices: AuthService) { }

  ngOnInit() {
    $('.dropdown-trigger').dropdown({
      constrainWidth: true,
      hover: true, // Activate on hover
      coverTrigger: false // Show list bollow the trigger
    });
  }

  logout() {
    this.loginServices.logout();
  }

}
