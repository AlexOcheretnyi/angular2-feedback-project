import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR }                    from '@angular/forms';

import { CustomControlValueAccessor } from '../../shared/custom-control-value-accessor';
import { EmojiNames }                 from '../angular2-feedback.type';
import { defaultEmojiNames }          from '../../configs';

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
export class FeedbackEmojiListComponent extends CustomControlValueAccessor implements OnInit{
  @Input() feedbackEmojiNames: EmojiNames;

  public feedbackEmojiList: { emojiName: string, emojiClass: string}[];

  constructor() {
    super();
  }

  ngOnInit() {
    this._updateEmojiList();
  }

   public onEmojiChosen(index: number): void {
    this.value = index;
  }

  private _updateEmojiList() {
    this.feedbackEmojiList = this.feedbackEmojiNames.map((elem, i) => {
      const defaultEmojiName = defaultEmojiNames[i].replace(' ', '-');
      return { emojiName: elem, emojiClass: defaultEmojiName };
    });
  }
}
