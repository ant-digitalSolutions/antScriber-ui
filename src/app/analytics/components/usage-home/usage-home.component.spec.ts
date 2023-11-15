import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageHomeComponent } from './usage-home.component';

describe('UsageHomeComponent', () => {
  let component: UsageHomeComponent;
  let fixture: ComponentFixture<UsageHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsageHomeComponent]
    });
    fixture = TestBed.createComponent(UsageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
