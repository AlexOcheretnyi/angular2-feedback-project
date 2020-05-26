import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEmojiListComponent } from './feedback-emoji-list.component';

describe('FeedbackEmojiListComponent', () => {
  let component: FeedbackEmojiListComponent;
  let fixture: ComponentFixture<FeedbackEmojiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackEmojiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEmojiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
