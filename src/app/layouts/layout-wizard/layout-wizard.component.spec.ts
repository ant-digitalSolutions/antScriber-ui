import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWizardComponent } from './layout-wizard.component';

describe('LayoutWizardComponent', () => {
  let component: LayoutWizardComponent;
  let fixture: ComponentFixture<LayoutWizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutWizardComponent]
    });
    fixture = TestBed.createComponent(LayoutWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
