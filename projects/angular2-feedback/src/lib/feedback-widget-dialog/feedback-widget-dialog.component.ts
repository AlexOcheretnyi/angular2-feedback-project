import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators }                                                           from '@angular/forms';

import { FeedbackPosition, FeedbackEmojiName } from '../angular2-feedback.type';
import { Angular2FeedbackService }             from '../angular2-feedback.service';

import html2canvas from 'html2canvas';
import {HtmlTagsValidator} from '../../shared/validators/html-tags.validator';
import {NavigationEnd, Router } from '@angular/router';
import {Subscription} from 'rxjs';

// @dynamic
@Component({
  selector: 'feedback-widget-dialog',
  templateUrl: './feedback-widget-dialog.component.html',
  styleUrls: ['./feedback-widget-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackWidgetDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('feedbackDialog') feedbackDialog: ElementRef;

  @Input() feedbackEmojiNames: FeedbackEmojiName[];
  @Input() feedbackDialogPosition: FeedbackPosition;
  @Input() feedbackRateTitle: string;
  @Input() feedbackEmailTitle: string;
  @Input() feedbackPlaceholder: string;

  public feedbackForm: FormGroup;

  public isFeedbackSubmitted: boolean = false;

  get isFeedbackMainContainer(): boolean {
    return this.feedbackForm.get('score').value !== null && !this.isFeedbackSubmitted;
  }

  private routerSubscription: Subscription = null;

  constructor(private fb: FormBuilder,
              private renderer2: Renderer2,
              private _feedbackWidgetService: Angular2FeedbackService,
              @Optional() private router: Router) { }

  ngOnInit() {
    this._initForm();
    if (this.router) {
      this.feedbackForm.get('route').setValue(this.router.url);
      this._listenRouterChange();
    }
  }

  ngAfterViewInit() {
    this._removeAriseClass();
  }

  public onSubmit(isEmail: boolean): void {
    if (!isEmail) { this.feedbackForm.patchValue({email: ''}); }
    this._feedbackWidgetService.setFeedbackOutput = this.feedbackForm.value;
    this._feedbackWidgetService.feedbackWidgetClose();
  }

  public onFeedbackSubmit(): void {
    const screenshotElem = this._feedbackWidgetService.getScreenshotElement;
    if (screenshotElem) { this._createElementScreenshot(screenshotElem); }
    this.isFeedbackSubmitted = true;
  }

  public onFeedbackDialogClosed(): void {
    this._feedbackWidgetService.feedbackWidgetClose();
  }

  private _initForm() {
    this.feedbackForm = this.fb.group({
      feedback: ['', [Validators.required, HtmlTagsValidator]],
      score: [null],
      screenshot: [null],
      email: ['',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),
          HtmlTagsValidator
        ]
      ],
      route: [null]
    });
  }

  private _createElementScreenshot(screenshotElem: HTMLElement): void {
    html2canvas(screenshotElem).then(canvas => {
      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('screenshot', blob, `${new Date().toUTCString()}.jpeg`);
        this.feedbackForm.get('screenshot').setValue(formData.get('screenshot'));
        this._feedbackWidgetService.feedbackScreenshotCreate();
      }, 'image/jpeg', 0.5);
    });
  }

  private _removeAriseClass(): void {
    setTimeout(() => {
      this.renderer2.removeClass(this.feedbackDialog.nativeElement, 'fw-dialog--arise');
    }, 1500);
  }

  private _listenRouterChange() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { this.feedbackForm.get('route').setValue(this.router.url); }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) { this.routerSubscription.unsubscribe(); }
  }
}
