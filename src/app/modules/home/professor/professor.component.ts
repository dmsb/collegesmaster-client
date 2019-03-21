import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/authentication/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {

  @Input("page") 
  page: string;
  
  constructor(private loginServices: AuthService, private router: Router) { }

  ngOnInit() {
    $('.dropdown-trigger').dropdown({
      constrainWidth: true,
      hover: true, // Activate on hover
      coverTrigger: false // Show list bollow the trigger
    });
    this.page = 'challenges';
  }

  logout() {
    this.loginServices.logout();
  }

  choose(page: string) {
    //this.page = page;
    this.router.navigate(['/home/professor/' + page]);
  }

}
