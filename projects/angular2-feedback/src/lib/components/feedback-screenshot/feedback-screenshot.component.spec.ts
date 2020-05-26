import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackScreenshotComponent } from './feedback-screenshot.component';

describe('FwSelectElementComponent', () => {
  let component: FeedbackScreenshotComponent;
  let fixture: ComponentFixture<FeedbackScreenshotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackScreenshotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackScreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
