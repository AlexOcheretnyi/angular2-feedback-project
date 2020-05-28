# Angular2-Feedback

> A light and easy to use feedback library for Angular 2. Its feature dedicated to store user's feedback. 

## Setup

Install library

```shell
npm install --save angular2-feedback
```

Add Angular2FeedbackModule in to your AppModule or CoreModule.
```shell
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
```

Add the Angular2FeedbackComponent in to your AppComponent.

```shell
...
template: '<angular2-feedback></angular2-feedback>'
...
```

The options and events that can be used when working with feedback widget.

```shell
<angular2-feedback 
    [feedbackEmojis]="emojis"
    [feedbackWidgetOptions]="options"
    (feedbackStart)="onStart()"
    (feedbackDialogClosed)="onClose()"
    (feedbackOutput)="onOutput($event)"
  ></angular2-feedback>
```

## Options
   Feedback widget options
   
   Option | Type | Default
   ------------- | ------------- | -------------
   __feedbackEmojis__ | `Array<string>(5)` | `['hate', 'dislike', 'neutral', 'like', 'love']`
   __feedbackWidgetOptions__ | `FeedbackWidgetOptions` | `{ buttonText: 'Feedback', buttonClass: 'feedback-btn__start', buttonSize: 'medium', feedbackPosition: 'right', feedbackSuccessTitle:  FEEDBACK_SUCCESS_TITLE, feedbackRateTitle: FEEDBACK_RATE_TITLE, feedbackEmailTitle: FEEDBACK_EMAIL_TITLE, feedbackPlaceholder: FEEDBACK_PLACEHOLDER }`
   
   
   FeedbackWidgetOptions interface
   
   ```shell
    interface FeedbackWidgetOptions {
      buttonSize?: ButtonSize;
      feedbackPosition?: FeedbackPosition;
      buttonClass?: string;
      buttonText?: string;
      feedbackSuccessTitle?: string;
      feedbackRateTitle?: string;
      feedbackEmailTitle?: string;
      feedbackPlaceholder?: string;
    }
   ```
  
  ## License
  
  MIT © [Ochreretnyi Oleksandr](mailto:ochierietnii@gmail.com)
