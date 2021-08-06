import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StudentApiService } from './services/studentapi.service';
import { IStudents } from './students/students';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YearDetailsComponent } from './year-details/year-details.component';

@NgModule({
  declarations: [
    AppComponent,
    YearDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [HttpClient, StudentApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
