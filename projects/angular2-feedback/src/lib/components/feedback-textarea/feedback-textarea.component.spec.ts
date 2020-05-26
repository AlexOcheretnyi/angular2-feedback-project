import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackTextareaComponent } from './feedback-textarea.component';

describe('FwTextareaComponent', () => {
  let component: FeedbackTextareaComponent;
  let fixture: ComponentFixture<FeedbackTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
