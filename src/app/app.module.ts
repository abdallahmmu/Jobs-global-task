import {  APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';



import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './pages/home/home.component';
import { NavigationBarComponent } from "./shared/navigation-bar/navigation-bar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInit } from './shared/helpers/app-init';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot(),
    NavigationBarComponent,
    FooterComponent,
    BrowserAnimationsModule
],
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: AppInit,
      multi: true,
      deps: [AuthService,Router],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
