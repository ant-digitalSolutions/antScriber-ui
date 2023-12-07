import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanIntervalSelectorComponent } from './plan-interval-selector.component';

describe('PlanIntervalSelectorComponent', () => {
  let component: PlanIntervalSelectorComponent;
  let fixture: ComponentFixture<PlanIntervalSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanIntervalSelectorComponent]
    });
    fixture = TestBed.createComponent(PlanIntervalSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
