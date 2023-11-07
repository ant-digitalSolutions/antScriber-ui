import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsBillingComponent } from './user-settings-billing.component';

describe('UserSettingsBillingComponent', () => {
  let component: UserSettingsBillingComponent;
  let fixture: ComponentFixture<UserSettingsBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSettingsBillingComponent]
    });
    fixture = TestBed.createComponent(UserSettingsBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
