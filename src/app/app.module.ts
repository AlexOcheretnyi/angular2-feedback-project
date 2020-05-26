import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {Angular2FeedbackModule} from '../../projects/angular2-feedback/src/lib/angular2-feedback.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Angular2FeedbackModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
