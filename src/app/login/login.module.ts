import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
