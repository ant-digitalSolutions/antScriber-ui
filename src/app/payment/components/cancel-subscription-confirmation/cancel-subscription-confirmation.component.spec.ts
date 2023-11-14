import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubscriptionConfirmationComponent } from './cancel-subscription-confirmation.component';

describe('CancelSubscriptionConfirmationComponent', () => {
  let component: CancelSubscriptionConfirmationComponent;
  let fixture: ComponentFixture<CancelSubscriptionConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelSubscriptionConfirmationComponent]
    });
    fixture = TestBed.createComponent(CancelSubscriptionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
