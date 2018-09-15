import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginServices: LoginService) { }

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
