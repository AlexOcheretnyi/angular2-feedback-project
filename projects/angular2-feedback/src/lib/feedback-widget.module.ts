import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  components,
  FeedbackWidgetComponent,
  FeedbackScreenshotComponent,
  FeedbackScreenshotWindowComponent,
  FeedbackWidgetDialogComponent
} from './components';
import { FeedbackInputComponent } from './components/feedback-input/feedback-input.component';
import { FeedbackWidgetService }  from './feedback-widget.service';

@NgModule({
  declarations: [
    ...components,
    FeedbackInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FeedbackWidgetService],
  entryComponents: [FeedbackScreenshotComponent, FeedbackScreenshotWindowComponent, FeedbackWidgetDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FeedbackWidgetComponent]
})
export class FeedbackWidgetModule { }
