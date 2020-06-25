import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR }                    from '@angular/forms';

import { CustomControlValueAccessor } from '../../shared/custom-control-value-accessor';


@Component({
  selector: 'feedback-input',
  templateUrl: './feedback-input.component.html',
  styleUrls: ['./feedback-input.component.css'],
  providers: [
    {
     provide: NG_VALUE_ACCESSOR,
     useExisting: forwardRef(() => FeedbackInputComponent),
     multi: true
    }
  ]
})
export class FeedbackInputComponent extends CustomControlValueAccessor implements OnInit {
  @Input() placeholder: string = 'email@domain.com';
  @Input() type: string = 'email';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  public onInput(value) {
    this.value = value;
  }
}
