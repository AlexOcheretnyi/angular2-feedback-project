import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Angular2FeedbackModule } from 'projects/angular2-feedback/src/public-api';
import { TestComponent } from './test/test.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    Angular2FeedbackModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
