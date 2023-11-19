import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionUpdateConfirmationComponent } from './subscription-update-confirmation.component';

describe('SubscriptionUpdateConfirmationComponent', () => {
  let component: SubscriptionUpdateConfirmationComponent;
  let fixture: ComponentFixture<SubscriptionUpdateConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionUpdateConfirmationComponent]
    });
    fixture = TestBed.createComponent(SubscriptionUpdateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
