import {InjectionToken} from '@angular/core';
import {FeedbackWidgetOptions} from '../lib/angular2-feedback.interface';

export const FEEDBACK_CONFIG: InjectionToken<FeedbackWidgetOptions> = new InjectionToken<FeedbackWidgetOptions>('feedback.config');
