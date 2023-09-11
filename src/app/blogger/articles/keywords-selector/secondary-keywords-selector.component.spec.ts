import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryKeywordsSelectorComponent } from './secondary-keywords-selector.component';

describe('KeywordsSelectorComponent', () => {
  let component: SecondaryKeywordsSelectorComponent;
  let fixture: ComponentFixture<SecondaryKeywordsSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryKeywordsSelectorComponent]
    });
    fixture = TestBed.createComponent(SecondaryKeywordsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
