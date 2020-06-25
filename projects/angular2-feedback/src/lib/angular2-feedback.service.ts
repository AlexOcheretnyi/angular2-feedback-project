import {Inject, Injectable, Optional} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {FeedbackWidgetOptions, FeedbackWidgetOutput} from './angular2-feedback.interface';
import {FEEDBACK_CONFIG} from '../const';

@Injectable()
export class Angular2FeedbackService {

  private _feedbackWidgetClosed$: Subject<void> = new Subject<void>();
  private _feedbackScreenshotCreated$: Subject<void> = new Subject<void>();
  private _feedbackOutput$: Subject<FeedbackWidgetOutput> = new Subject<FeedbackWidgetOutput>();

  public feedbackWidgetClosed$: Observable<void> = this._feedbackWidgetClosed$.asObservable();
  public feedbackScreenshotCreated$: Observable<void> = this._feedbackScreenshotCreated$.asObservable();
  public feedbackOutput$: Observable<FeedbackWidgetOutput> = this._feedbackOutput$.asObservable();

  private _screenshotElement: HTMLElement = null;
  private _widgetElement: HTMLElement = null;

  constructor(@Inject(FEEDBACK_CONFIG) @Optional() public readonly feedbackConfig: FeedbackWidgetOptions) { }

  set setWidgetElement(element: HTMLElement) { this._widgetElement = element; }

  set setScreenshotElement(element: HTMLElement) { this._screenshotElement = element; }

  set setFeedbackOutput(value: FeedbackWidgetOutput) {
    this._feedbackOutput$.next(value);
  }

  get getScreenshotElement() { return this._screenshotElement; }

  public hideFeedbackDialog() { this._widgetElement.style.display = 'none'; }

  public showFeedbackDialog() { this._widgetElement.style.display = 'block'; }

  public feedbackWidgetClose() { this._feedbackWidgetClosed$.next(); }

  public feedbackScreenshotCreate() { this._feedbackScreenshotCreated$.next(); }
}
