import {EmojiNames, FeedbackButtonSize, FeedbackPosition} from './angular2-feedback.type';

export interface EmojiState {
  type: string;
  state: boolean;
}

export interface FeedbackWidgetOptions {
  buttonSize?: FeedbackButtonSize;
  feedbackPosition?: FeedbackPosition;
  buttonClass?: string;
  buttonText?: string;
  feedbackSuccessTitle?: string;
  feedbackRateTitle?: string;
  feedbackEmailTitle?: string;
  feedbackPlaceholder?: string;
  emojiNames?: EmojiNames;
}

export interface FeedbackWidgetOutput {
  email: string;
  score: number;
  screenshot: File;
  feedback: string;
}
