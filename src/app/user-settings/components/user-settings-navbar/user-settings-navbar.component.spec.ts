import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsNavbarComponent } from './user-settings-navbar.component';

describe('UserSettingsNavbarComponent', () => {
  let component: UserSettingsNavbarComponent;
  let fixture: ComponentFixture<UserSettingsNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSettingsNavbarComponent]
    });
    fixture = TestBed.createComponent(UserSettingsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
