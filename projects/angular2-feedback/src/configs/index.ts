import { FeedbackWidgetOptions } from '../lib/angular2-feedback.interface';
import {FEEDBACK_EMAIL_TITLE, FEEDBACK_PLACEHOLDER, FEEDBACK_RATE_TITLE, FEEDBACK_SUCCESS_TITLE} from '../texts';
import {EmojiNames} from '../lib/angular2-feedback.type';

export const defaultFeedbackWidgetConfig: FeedbackWidgetOptions = {
  buttonText: 'Feedback',
  buttonClass: 'fw-btn--start',
  buttonSize: 'medium',
  feedbackPosition: 'right',
  feedbackSuccessTitle:  FEEDBACK_SUCCESS_TITLE,
  feedbackRateTitle: FEEDBACK_RATE_TITLE,
  feedbackEmailTitle: FEEDBACK_EMAIL_TITLE,
  feedbackPlaceholder: FEEDBACK_PLACEHOLDER
};

export const defaultEmojiNames: EmojiNames = ['very bad', 'dislike', 'neutral', 'like', 'very good'];
