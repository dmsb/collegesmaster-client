import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from './core/header/header.module';
import { FooterModule } from './core/footer/footer.module';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { AppRoutingModule } from './routings/app-routing/app-routing.module';
import { AuthService } from './core/authentication/auth.service';

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
