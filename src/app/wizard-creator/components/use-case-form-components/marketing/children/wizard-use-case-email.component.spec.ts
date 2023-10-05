import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseEmailComponent } from './wizard-use-case-email.component';

describe('WizardUseCaseEmailComponent', () => {
  let component: WizardUseCaseEmailComponent;
  let fixture: ComponentFixture<WizardUseCaseEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseEmailComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
