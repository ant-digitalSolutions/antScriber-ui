import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryKeywordSelectorComponent } from './primary-keyword-selector.component';

describe('PrimaryKeywordSelectorComponent', () => {
  let component: PrimaryKeywordSelectorComponent;
  let fixture: ComponentFixture<PrimaryKeywordSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryKeywordSelectorComponent]
    });
    fixture = TestBed.createComponent(PrimaryKeywordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
