import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2FeedbackComponent } from './angular2-feedback.component';

describe('FeedbackWidgetComponent', () => {
  let component: Angular2FeedbackComponent;
  let fixture: ComponentFixture<Angular2FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular2FeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
