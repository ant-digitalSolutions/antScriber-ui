import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutReturnComponent } from './checkout-return.component';

describe('CheckoutReturnComponent', () => {
  let component: CheckoutReturnComponent;
  let fixture: ComponentFixture<CheckoutReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutReturnComponent]
    });
    fixture = TestBed.createComponent(CheckoutReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
