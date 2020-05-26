import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedbackInputComponent }    from './feedback-input/feedback-input.component';
import { Angular2FeedbackService }   from './angular2-feedback.service';
import {FeedbackWidgetComponent}     from './feedback-widget/feedback-widget.component';
import {FeedbackScreenshotComponent} from './feedback-screenshot/feedback-screenshot.component';
import {FeedbackScreenshotWindowComponent} from './feedback-screenshot/feedback-screenshot-window/feedback-screenshot-window.component';
import {FeedbackWidgetDialogComponent} from './feedback-widget-dialog/feedback-widget-dialog.component';
import {FeedbackEmojiListComponent}    from './feedback-emoji-list/feedback-emoji-list.component';
import {FeedbackTextareaComponent}     from './feedback-textarea/feedback-textarea.component';

@NgModule({
  declarations: [
    FeedbackInputComponent,
    FeedbackWidgetComponent,
    FeedbackScreenshotComponent,
    FeedbackScreenshotWindowComponent,
    FeedbackWidgetDialogComponent,
    FeedbackEmojiListComponent,
    FeedbackTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Angular2FeedbackService],
  entryComponents: [FeedbackScreenshotComponent, FeedbackScreenshotWindowComponent, FeedbackWidgetDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FeedbackWidgetComponent]
})
export class Angular2FeedbackModule { }
