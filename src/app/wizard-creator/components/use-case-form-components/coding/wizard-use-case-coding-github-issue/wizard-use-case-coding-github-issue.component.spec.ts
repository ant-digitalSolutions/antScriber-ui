import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseCodingGithubIssueComponent } from './wizard-use-case-coding-github-issue.component';

describe('WizardUseCaseCodingGithubIssueComponent', () => {
  let component: WizardUseCaseCodingGithubIssueComponent;
  let fixture: ComponentFixture<WizardUseCaseCodingGithubIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseCodingGithubIssueComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseCodingGithubIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
