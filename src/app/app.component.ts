import { Component } from '@angular/core';
import {Angular2FeedbackService} from '../../projects/angular2-feedback/src/lib/angular2-feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular2-feedback-project';

  constructor(private feedbackService: Angular2FeedbackService) {}


  onShow() {
    this.feedbackService.showFeedback();
  }

  hide() {
    this.feedbackService.hideFeedback();
  }
}
