import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR }                    from '@angular/forms';

import { CustomControlValueAccessor } from '../../shared/custom-control-value-accessor';

@Component({
  selector: 'feedback-textarea',
  templateUrl: './feedback-textarea.component.html',
  styleUrls: ['./feedback-textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeedbackTextareaComponent),
      multi: true
    }
  ]
})
export class FeedbackTextareaComponent extends CustomControlValueAccessor implements OnInit {

  @Input() placeholder: string = 'Tell us about your experience...';

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onInput(value: string) {
    this.value = value;
  }
}
