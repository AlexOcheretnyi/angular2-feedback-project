import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackScreenshotWindowComponent } from './feedback-screenshot-window.component';

describe('FwSelectWindowComponent', () => {
  let component: FeedbackScreenshotWindowComponent;
  let fixture: ComponentFixture<FeedbackScreenshotWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackScreenshotWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackScreenshotWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
