import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsChangePasswordComponent } from './user-settings-change-password.component';

describe('UserSettingsChangePasswordComponent', () => {
  let component: UserSettingsChangePasswordComponent;
  let fixture: ComponentFixture<UserSettingsChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSettingsChangePasswordComponent]
    });
    fixture = TestBed.createComponent(UserSettingsChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
