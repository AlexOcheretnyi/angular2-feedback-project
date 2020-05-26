import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackWidgetDialogComponent } from './feedback-widget-dialog.component';

describe('FeedbackWidgetDialogComponent', () => {
  let component: FeedbackWidgetDialogComponent;
  let fixture: ComponentFixture<FeedbackWidgetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackWidgetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackWidgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
