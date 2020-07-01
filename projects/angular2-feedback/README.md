# Angular2-Feedback

> Angular2-feedback is an Angular library for collecting users feedbacks with ability to create page element screenshot. The user will be able to set rate experience, add feedback, select an element of the page to create a screenshot and leave users email  

## Setup

Install library

```shell
npm install --save angular2-feedback
```

Add Angular2FeedbackModule in to your feature module.
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
    [feedbackEmojiNames]="emojis"
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
   __feedbackEmojiNames__ | `Array<string>(5)` | `['very bad', 'dislike', 'neutral', 'like', 'very good']`
   __feedbackWidgetOptions__ | `FeedbackWidgetOptions` | `{ buttonText: 'Feedback', buttonClass: 'feedback-btn__start', buttonSize: 'medium', feedbackPosition: 'right', feedbackSuccessTitle:  FEEDBACK_SUCCESS_TITLE, feedbackRateTitle: FEEDBACK_RATE_TITLE, feedbackEmailTitle: FEEDBACK_EMAIL_TITLE, feedbackPlaceholder: FEEDBACK_PLACEHOLDER }`
 
   <br/>
     
   ```shell
    interface FeedbackWidgetOptions {
      buttonSize?: 'small' | 'middle' | 'large';
      feedbackPosition?: 'right' | 'left';
      buttonClass?: string;
      buttonText?: string;
      feedbackSuccessTitle?: string;
      feedbackRateTitle?: string;
      feedbackEmailTitle?: string;
      feedbackPlaceholder?: string;
    }
   ```

## Output

   ```shell
    
    interface FeedbackWidgetOutput {
      email: string;
      score: number; // 1 - 5
      screenshot: null | File;
      feedback: string;
      route: null | string;
    }
   ```
  
## License
  
  MIT © [Ochreretnyi Oleksandr](mailto:ochierietnii@gmail.com)
