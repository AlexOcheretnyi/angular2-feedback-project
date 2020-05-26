import {ButtonSize, FeedbackPosition} from './angular2-feedback.type';

export interface EmojiState {
  type: string;
  state: boolean;
}

export interface FeedbackWidgetOptions {
  buttonSize?: ButtonSize;
  feedbackPosition?: FeedbackPosition;
  buttonClass?: string;
  buttonText?: string;
  feedbackSuccessTitle?: string;
  feedbackRateTitle?: string;
  feedbackEmailTitle?: string;
  feedbackPlaceholder?: string;
}
