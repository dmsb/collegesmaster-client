import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    LoginModule,
    HomeModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
