import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { AuthService } from './auth/auth.service';

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
  providers: [CookieService, 
  { provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true 
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
