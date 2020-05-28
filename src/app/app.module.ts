import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Angular2FeedbackModule } from 'angular2-feedback';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2FeedbackModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
