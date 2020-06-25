import { ComponentFactory, ComponentFactoryResolver, Directive, OnInit, ViewContainerRef } from '@angular/core';

import { Angular2FeedbackService }   from './angular2-feedback.service';
import { Angular2FeedbackComponent } from './angular2-feedback/angular2-feedback.component';

@Directive({
  selector: '[Angular2Feedback]'
})
export class Angular2FeedbackDirective implements OnInit{

  constructor(private viewContainerRef: ViewContainerRef,
              private _feedbackService: Angular2FeedbackService,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this._feedbackService.setFeedbackViewContainer = this.viewContainerRef;
    this._feedbackService.setFeedbackComponentFactory = this._initializeFeedbackComponentFactory();
    const isVisibleByDefault = this._feedbackService.feedbackConfig.isVisibleByDefault;
    if (isVisibleByDefault) { this._feedbackService.showFeedback(); }
  }

  private _initializeFeedbackComponentFactory(): ComponentFactory<Angular2FeedbackComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(Angular2FeedbackComponent);
  }

}
