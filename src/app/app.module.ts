import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgOptimizedImage } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NewsComponent } from './news/news.component';
import { TablesComponent } from './tables/tables.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './auth.service';
import { ProfileComponent } from './profile/profile.component';

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
    AppRoutingModule,
    ButtonsModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
