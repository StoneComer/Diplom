import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NewsComponent } from './news/news.component';
import { TablesComponent } from './tables/tables.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsService } from './news.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AuthorizationComponent,
    NewsComponent,
    TablesComponent,
    RegistrationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonsModule,
    NgOptimizedImage,
    FormsModule,
    CommonModule,
  ],
  providers: [AuthService, HttpClient, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
