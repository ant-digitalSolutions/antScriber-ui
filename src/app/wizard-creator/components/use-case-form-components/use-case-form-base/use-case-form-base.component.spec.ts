import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseFormBaseComponent } from './use-case-form-base.component';

describe('UseCaseFormBaseComponent', () => {
  let component: UseCaseFormBaseComponent;
  let fixture: ComponentFixture<UseCaseFormBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseCaseFormBaseComponent]
    });
    fixture = TestBed.createComponent(UseCaseFormBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
