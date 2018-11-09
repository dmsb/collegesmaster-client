import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../../core/header/header.module';
import { FooterModule } from '../../core/footer/footer.module';

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
