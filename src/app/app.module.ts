import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Angular2FeedbackModule } from '../../projects/angular2-feedback/src/public-api';

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
