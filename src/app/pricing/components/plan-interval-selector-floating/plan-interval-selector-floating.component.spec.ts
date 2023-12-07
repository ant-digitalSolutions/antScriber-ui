import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanIntervalSelectorFloatingComponent } from './plan-interval-selector-floating.component';

describe('PlanIntervalSelectorFloatingComponent', () => {
  let component: PlanIntervalSelectorFloatingComponent;
  let fixture: ComponentFixture<PlanIntervalSelectorFloatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanIntervalSelectorFloatingComponent]
    });
    fixture = TestBed.createComponent(PlanIntervalSelectorFloatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
