import { EmojiNames, FeedbackButtonSize, FeedbackPosition } from './angular2-feedback.type';

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
  isVisibleByDefault?: boolean;
}

export interface FeedbackWidgetOutput {
  email: string;
  score: number;
  screenshot: File;
  feedback: string;
}
