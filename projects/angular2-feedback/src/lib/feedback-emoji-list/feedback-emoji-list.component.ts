import {Component, forwardRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {CustomControlValueAccessor} from '../../shared/custom-control-value-accessor';
import {EmojiName} from '../angular2-feedback.type';

@Component({
  selector: 'feedback-emoji-list',
  templateUrl: './feedback-emoji-list.component.html',
  styleUrls: ['./feedback-emoji-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeedbackEmojiListComponent),
      multi: true
    }
  ]
})
export class FeedbackEmojiListComponent extends CustomControlValueAccessor implements OnInit {
  @Input() feedbackEmojis: EmojiName[];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  onEmojiChosen(emoji: EmojiName , index: number) {
    this.value = index;
  }
}
