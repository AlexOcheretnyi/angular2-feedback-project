import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injector, Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { first }        from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FeedbackScreenshotWindowComponent } from './feedback-screenshot-window/feedback-screenshot-window.component';
import { Angular2FeedbackService }           from '../angular2-feedback.service';

// @dynamic
@Component({
  selector: 'feedback-screenshot',
  templateUrl: './feedback-screenshot.component.html',
  styleUrls: ['./feedback-screenshot.component.css']
})
export class FeedbackScreenshotComponent implements OnInit, OnDestroy {
  @Input() screenshotHintText = 'Select an element on the page.';

  private componentRef: ComponentRef<FeedbackScreenshotWindowComponent>;
  private domInstance: HTMLElement = null;

  private screenshotWindowSubscription: Subscription = null;

  private removeScreenshotWindow = () => {
    this._feedbackService.setScreenshotElement = null;
    if (this.componentRef) {
      this.componentRef.instance.removeListeners();
      this.appRef.detachView(this.componentRef.hostView);
    }
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private _feedbackService: Angular2FeedbackService,
              @Inject(DOCUMENT) private document: Document) { }
  ngOnInit() {
    this._listenFeedbackWidgetClose();
    this._listenFeedbackScreenshotCreate();
  }

  public onClick() {
    this.domInstance ? this._reinitScreenshotWindow() : this._initScreenshotWindow();
  }

  private _reinitScreenshotWindow() {
    this.componentRef.instance.removeListeners();
    this.appRef.detachView(this.componentRef.hostView);
    if (this.screenshotWindowSubscription) { this.screenshotWindowSubscription.unsubscribe(); }
    this._initScreenshotWindow();
  }

  private _initScreenshotWindow() {
    this._feedbackService.hideFeedbackDialog();
    this.componentRef = this.componentFactoryResolver.resolveComponentFactory(FeedbackScreenshotWindowComponent).create(this.injector);
    this._listenSreenshotWindowClose(this.componentRef);
    this.appRef.attachView(this.componentRef.hostView);
    this.domInstance = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(this.domInstance);
  }

  private _listenFeedbackWidgetClose(): void {
    this._feedbackService.feedbackWidgetClosed$.pipe(first()).subscribe(this.removeScreenshotWindow.bind(this));
  }

  private _listenFeedbackScreenshotCreate(): void {
    this._feedbackService.feedbackScreenshotCreated$.pipe(first()).subscribe(this.removeScreenshotWindow.bind(this));
  }

  private _listenSreenshotWindowClose(componentRef: ComponentRef<FeedbackScreenshotWindowComponent>): void {
    componentRef.instance.screenshotWindowClosed$.pipe(first()).subscribe(() => {
      this.appRef.detachView(componentRef.hostView);
    });
  }

  ngOnDestroy() {
    if (this.screenshotWindowSubscription) { this.screenshotWindowSubscription.unsubscribe(); }
  }

}
