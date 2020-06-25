import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Subscription } from 'rxjs';

import { EmojiNames } from '../angular2-feedback.type';
import { Angular2FeedbackService }       from '../angular2-feedback.service';
import { FeedbackWidgetDialogComponent } from '../feedback-widget-dialog/feedback-widget-dialog.component';

import { FeedbackWidgetOptions } from '../angular2-feedback.interface';

@Component({
  selector: 'angular2-feedback',
  templateUrl: './angular2-feedback.component.html',
  styleUrls: ['./angular2-feedback.component.css']
})
export class Angular2FeedbackComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('feedbackBtn') feedbackButton: ElementRef<HTMLButtonElement>;
  @ViewChild('feedbackWidgetDialog', { read: ViewContainerRef }) feedbackDialogViewContainerRef: ViewContainerRef;

  public feedbackEmojiNames: EmojiNames;
  public feedbackWidgetOptions: FeedbackWidgetOptions;

  @Output() feedbackStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() feedbackDialogClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() feedbackOutput: EventEmitter<any> = new EventEmitter<any>();

  public isButtonVisible = true;
  public isFeedbackFinished = false;

  private feedbackCloseSubscription: Subscription = null;
  private feedbackOutputSubscription: Subscription = null;

  private onWidgetCloseCallback = () => {
    this.feedbackDialogViewContainerRef.clear();
    this.renderer2.setStyle(this.feedbackButton.nativeElement, 'display', 'block');
    this.isButtonVisible = true;
    this.feedbackDialogClosed.emit();
    this._removeListeners();
  }

  constructor(private renderer2: Renderer2,
              private _feedbackWidgetService: Angular2FeedbackService,
              private elRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.feedbackWidgetOptions = this._feedbackWidgetService.feedbackConfig;
    this.feedbackEmojiNames = this.feedbackWidgetOptions.emojiNames;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this._feedbackWidgetService.setWidgetElement = this.elRef.nativeElement;
  }

  public onSuccessPopupClose() {
    this.isFeedbackFinished = false;
  }

  public onFeedbackStart(): void {
    this.isFeedbackFinished = false;
    this._listenFeedbackWidgetClose();
    this._listenFeedbackOutput();
    this._listenFeedbackWidgetStart();
  }

  private _listenFeedbackOutput(): void {
    this.feedbackOutputSubscription = this._feedbackWidgetService.feedbackOutput$.subscribe(value => {
      this.feedbackOutput.next(value);
      this.isFeedbackFinished = true;
      setTimeout(() => this.isFeedbackFinished = false, 8000);
    });
  }

  private _removeListeners(): void {
    if (this.feedbackCloseSubscription) { this.feedbackCloseSubscription.unsubscribe(); }
    if (this.feedbackOutputSubscription) { this.feedbackOutputSubscription.unsubscribe(); }
  }

  private _listenFeedbackWidgetClose(): void {
    this.feedbackCloseSubscription = this._feedbackWidgetService.feedbackWidgetClosed$.subscribe(this.onWidgetCloseCallback.bind(this));
  }

  private _listenFeedbackWidgetStart(): void {
    this.feedbackStart.emit();
    this._initDialogComponent();
    this.renderer2.setStyle(this.feedbackButton.nativeElement, 'display', 'none');
    this.isButtonVisible = false;
  }

  private _initDialogComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FeedbackWidgetDialogComponent);
    this.feedbackDialogViewContainerRef.clear();
    const componentRef = this.feedbackDialogViewContainerRef.createComponent(componentFactory);
    const componentInstance =  (componentRef.instance as FeedbackWidgetDialogComponent);
    this._updatedComponentInputs(componentInstance);
  }

  private _updatedComponentInputs(componentInstance: FeedbackWidgetDialogComponent): void {
    componentInstance.feedbackDialogPosition = this.feedbackWidgetOptions.feedbackPosition;
    componentInstance.feedbackEmojiNames = this.feedbackEmojiNames;
    componentInstance.feedbackRateTitle = this.feedbackWidgetOptions.feedbackRateTitle;
    componentInstance.feedbackEmailTitle = this.feedbackWidgetOptions.feedbackEmailTitle;
    componentInstance.feedbackPlaceholder = this.feedbackWidgetOptions.feedbackPlaceholder;
  }

  ngOnDestroy() {
    if (this.feedbackCloseSubscription) { this.feedbackCloseSubscription.unsubscribe(); }
  }
}
