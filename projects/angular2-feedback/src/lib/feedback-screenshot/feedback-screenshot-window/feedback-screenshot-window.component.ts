import {AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, Renderer2, ViewEncapsulation} from '@angular/core';
import { Angular2FeedbackService } from '../../angular2-feedback.service';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, first, skip, tap, throttleTime} from 'rxjs/operators';
import {BackdropPositions} from '../../angular2-feedback.type';
import {DOCUMENT, ViewportScroller} from '@angular/common';

// @dynamic
@Component({
  selector: 'feedback-screenshot-window',
  templateUrl: './feedback-screenshot-window.component.html',
  styleUrls: ['./feedback-screenshot-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackScreenshotWindowComponent implements OnInit, AfterViewInit {
  @Output() screenshotWindowClosed$: EventEmitter<void> = new EventEmitter<void>();
  public isElementSelected = false;

  private windowMouseOverSubscription: Subscription;
  private windowMouseOutSubscription: Subscription;
  private windowClickSubscription: Subscription;
  private windowWheelSubscription: Subscription;
  private windowScrollSubscription: Subscription;

  private windowRightShadow: HTMLElement;
  private windowLeftShadow: HTMLElement;
  private windowTopShadow: HTMLElement;
  private windowBottomShadow: HTMLElement;
  private windowContent: HTMLElement;

  private eventCallback = (event) => {
    const target = event.target as HTMLElement;
    if (target.id === 'feedback-screenshot-window-close') { return; }
    this._recalculateElementSizes(target);
  }

  constructor(private renderer2: Renderer2,
              private feedbackService: Angular2FeedbackService,
              private scroller: ViewportScroller,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this._initEventListeners();
  }

  ngAfterViewInit(): void {
    this._initShadowElements();
  }

  public onScreenshotWindowClose(): void {
    this.screenshotWindowClosed$.emit();
    this.feedbackService.setScreenshotElement = null;
    this.removeListeners();
    this.feedbackService.showFeedbackDialog();
  }

  public onScreenshotChange(): void {
    this.feedbackService.hideFeedbackDialog();
    this.feedbackService.setScreenshotElement = null;
    this.removeListeners();
    this._initEventListeners();
    this.isElementSelected = false;
  }


  public removeListeners() {
    if (this.windowClickSubscription) { this.windowClickSubscription.unsubscribe(); }
    if (this.windowMouseOutSubscription) { this.windowMouseOutSubscription.unsubscribe(); }
    if (this.windowMouseOverSubscription) { this.windowMouseOverSubscription.unsubscribe(); }
    if (this.windowWheelSubscription) { this.windowWheelSubscription.unsubscribe(); }
    if (this.windowScrollSubscription) { this.windowScrollSubscription.unsubscribe(); }
  }

  private _initShadowElements(): void {
    this.windowRightShadow = document.querySelector('.feedback-screenshot__window__shade--right');
    this.windowLeftShadow = document.querySelector('.feedback-screenshot__window__shade--left');
    this.windowTopShadow = document.querySelector('.feedback-screenshot__window__shade--top');
    this.windowBottomShadow = document.querySelector('.feedback-screenshot__window__shade--bottom');
    this.windowContent = document.querySelector('.feedback-screenshot__window__content-highlighter');
  }

   private _initEventListeners(): void {
    this._initMouseOverSubscription();
    this._initMouseOutSubscription();
    this._initWheelSubscription();
    this._initClickSubscription();
  }

  private _initMouseOverSubscription(): void {
    this.windowMouseOverSubscription = fromEvent(window, 'mouseover')
      .pipe(tap(event => this.renderer2.addClass(event.target, 'feedback-screenshot__elem--hover')), debounceTime(10))
      .subscribe(this.eventCallback.bind(this));
  }

  private _initMouseOutSubscription(): void {
    this.windowMouseOutSubscription = fromEvent(window, 'mouseout' )
      .subscribe((event) => {
        const target = event.target as HTMLElement;
        this.renderer2.removeClass(target, 'feedback-screenshot__elem--hover');
      });
  }

  private _initWheelSubscription() {
    this.windowWheelSubscription = fromEvent(window, 'wheel')
      .pipe(throttleTime(10))
      .subscribe(this.eventCallback.bind(this));
  }

  private _initScrollSubscription(): void {
    const documentEl = this.document.documentElement;
    const left = (window.pageXOffset || documentEl.scrollLeft) - (documentEl.clientLeft || 0);
    const top = (window.pageYOffset || documentEl.scrollTop)  - (documentEl.clientTop || 0);
    this.windowScrollSubscription = fromEvent(window, 'scroll')
      .pipe(debounceTime(5))
      .subscribe(() => {
        this.scroller.scrollToPosition([left, top]);
    });
  }

  private _initClickSubscription() {
    this.windowClickSubscription = fromEvent(window, 'click')
      .pipe(skip(1), first())
      .subscribe((event) => {
        event.preventDefault();
        this.removeListeners();
        const target = event.target as HTMLElement;
        this.feedbackService.setScreenshotElement = target;
        this._initScrollSubscription();
        this.renderer2.removeClass(target, 'feedback-screenshot__elem--hover');
        this.feedbackService.showFeedbackDialog();
        this.isElementSelected = true;
      });
  }

  private _recalculateElementSizes(target: HTMLElement) {
    const targetPositions: ClientRect = target.getBoundingClientRect();
    this._updateElementSize(this.windowTopShadow, targetPositions, 'top');
    this._updateElementSize(this.windowLeftShadow, targetPositions, 'left');
    this._updateElementSize(this.windowRightShadow, targetPositions, 'right');
    this._updateElementSize(this.windowBottomShadow, targetPositions, 'bottom');
    this._updateElementSize(this.windowContent, targetPositions, 'center');
  }

  private _updateElementSize(target: HTMLElement, targetPositions: ClientRect, side: BackdropPositions): void {
    switch (side) {
      case 'left':
        this.renderer2.setStyle(target, 'top', `${targetPositions.top}px`);
        this.renderer2.setStyle(target, 'width', `${targetPositions.left}px`);
        break;
      case 'right':
        this.renderer2.setStyle(target, 'top', `${targetPositions.top}px`);
        this.renderer2.setStyle(target, 'left', `${targetPositions.right}px`);
        break;
      case 'top':
        this.renderer2.setStyle(target, 'height', `${targetPositions.top < 0 ? 1 : targetPositions.top}px`);
        break;
      case 'bottom':
        this.renderer2.setStyle(target, 'width', `${targetPositions.width}px`);
        this.renderer2.setStyle(target, 'left', `${targetPositions.left}px`);
        this.renderer2.setStyle(target, 'top', `${targetPositions.bottom}px`);
        break;
      case 'center':
        this.renderer2.setStyle(target, 'height', `${targetPositions.height}px`);
        this.renderer2.setStyle(target, 'top', `${targetPositions.top}px`);
        this.renderer2.setStyle(target, 'left', `${targetPositions.left}px`);
        this.renderer2.setStyle(target, 'width', `${targetPositions.width}px`);
        break;
    }
  }
}

