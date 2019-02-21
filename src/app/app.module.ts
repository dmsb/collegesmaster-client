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
import { PipesModule } from './core/pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatTableModule, MatSortModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatToolbarModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PipesModule,
    HeaderModule,
    FooterModule,
    LoginModule,
    HomeModule,
    
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
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
