import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { Subscription } from 'rxjs';

import { EmojiName }                     from '../../feedback-widget.type';
import { FeedbackWidgetService }         from '../../feedback-widget.service';
import { FeedbackWidgetDialogComponent } from '../feedback-widget-dialog/feedback-widget-dialog.component';

import { FeedbackWidgetOptions }       from '../../feedback-widget.interface';
import { defaultFeedbackWidgetConfig } from '../../configs';

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('feedbackBtn') feedbackButton: ElementRef<HTMLButtonElement>;
  @ViewChild('feedbackWidgetDialog', { read: ViewContainerRef }) feedbackDialog: ViewContainerRef;

  @Input() feedbackEmojis: EmojiName[] =  ['hate', 'dislike', 'neutral', 'like', 'love'];
  @Input() feedbackWidgetOptions: FeedbackWidgetOptions = defaultFeedbackWidgetConfig;

  @Output() feedbackStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() feedbackDialogClosed: EventEmitter<void> = new EventEmitter<void>();
  @Output() feedbackOutput: EventEmitter<any> = new EventEmitter<any>();

  public isButtonVisible = true;
  public isFeedbackFinished = false;

  private feedbackCloseSubscription: Subscription = null;
  private feedbackOutputSubscription: Subscription = null;

  private onWidgetCloseCallback = () => {
    this.feedbackDialog.clear();
    this.renderer2.setStyle(this.feedbackButton.nativeElement, 'display', 'block');
    this.isButtonVisible = true;
    this.feedbackDialogClosed.emit();
    this._removeListeners();
  }

  constructor(private renderer2: Renderer2,
              private _feedbackWidgetService: FeedbackWidgetService,
              private elRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this._feedbackWidgetService.setWidgetElement = this.elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const feedbackOptions = changes.feedbackWidgetOptions;
    if (feedbackOptions && feedbackOptions.firstChange) {
         this.feedbackWidgetOptions = Object.assign(defaultFeedbackWidgetConfig, feedbackOptions.currentValue);
    }
  }

  public onFeedbackStart(): void {
    this._listenFeedbackWidgetClose();
    this._listenFeedbackOutput();
    this._listenFeedbackWidgetStart();
  }

  private _listenFeedbackOutput(): void {
    this.feedbackOutputSubscription = this._feedbackWidgetService.feedbackOutput$.subscribe(value => {
      this.feedbackOutput.next(value);
      this.isFeedbackFinished = true;

      setTimeout(() => {
        this.isFeedbackFinished = false;
      }, 8000);
    });
  }

  private _removeListeners() {
    if (this.feedbackCloseSubscription) { this.feedbackCloseSubscription.unsubscribe(); }
    if (this.feedbackOutputSubscription) { this.feedbackOutputSubscription.unsubscribe(); }
  }

  private _listenFeedbackWidgetClose(): void {
    this.feedbackCloseSubscription = this._feedbackWidgetService.feedbackWidgetClosed$.subscribe(this.onWidgetCloseCallback.bind(this));
  }

  private _listenFeedbackWidgetStart() {
    this.feedbackStart.emit();
    this._initDialogComponent();
    this.renderer2.setStyle(this.feedbackButton.nativeElement, 'display', 'none');
    this.isButtonVisible = false;
  }

  private _initDialogComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FeedbackWidgetDialogComponent);
    this.feedbackDialog.clear();
    const componentRef = this.feedbackDialog.createComponent(componentFactory);
    const componentInstance =  (componentRef.instance as FeedbackWidgetDialogComponent);
    this._updatedComponentInputs(componentInstance);
  }

  private _updatedComponentInputs(componentInstance: FeedbackWidgetDialogComponent): void {
    componentInstance.feedbackDialogPosition = this.feedbackWidgetOptions.feedbackPosition;
    componentInstance.feedbackEmojis = this.feedbackEmojis;
    componentInstance.feedbackRateTitle = this.feedbackWidgetOptions.feedbackRateTitle;
    componentInstance.feedbackEmailTitle = this.feedbackWidgetOptions.feedbackEmailTitle;
    componentInstance.feedbackPlaceholder = this.feedbackWidgetOptions.feedbackPlaceholder;
  }

  ngOnDestroy() {
    if (this.feedbackCloseSubscription) { this.feedbackCloseSubscription.unsubscribe(); }
  }
}
