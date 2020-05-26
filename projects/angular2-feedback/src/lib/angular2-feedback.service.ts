import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class Angular2FeedbackService {

  private _feedbackWidgetClosed$: Subject<any> = new Subject<any>();
  private _feedbackScreenshotCreated$: Subject<any> = new Subject<any>();
  private _feedbackOutput$: Subject<any> = new Subject<any>();

  public feedbackWidgetClosed$: Observable<any> = this._feedbackWidgetClosed$.asObservable();
  public feedbackScreenshotCreated$: Observable<any> = this._feedbackScreenshotCreated$.asObservable();
  public feedbackOutput$: Observable<any> = this._feedbackOutput$.asObservable();

  private _screenshotElement: HTMLElement = null;
  private _widgetElement: HTMLElement = null;

  constructor() { }

  set setWidgetElement(element: HTMLElement) { this._widgetElement = element; }

  set setScreenshotElement(element: HTMLElement) { this._screenshotElement = element; }

  set setFeedbackOutput(value: any) {
    this._feedbackOutput$.next(value);
  }

  get getScreenshotElement() { return this._screenshotElement; }

  public hideFeedbackDialog() { this._widgetElement.style.display = 'none'; }

  public showFeedbackDialog() { this._widgetElement.style.display = 'block'; }

  public feedbackWidgetClose() { this._feedbackWidgetClosed$.next(); }

  public feedbackScreenshotCreate() { this._feedbackScreenshotCreated$.next(); }
}
