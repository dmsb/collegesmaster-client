import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/core/models/security/student';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from '../home.component';

declare var $ : any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent extends HomeComponent implements OnInit {

  private student : Student;

  ngOnInit() {
    this.student = this.getLoggedUser();
    $('.dropdown-trigger').dropdown({
      constrainWidth: true,
      hover: true, // Activate on hover
      coverTrigger: false // Show list bollow the trigger
    });
  }

}
