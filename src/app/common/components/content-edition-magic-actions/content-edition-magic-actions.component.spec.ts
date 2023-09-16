import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditionMagicActionsComponent } from './content-edition-magic-actions.component';

describe('ContentEditionMagicActionsComponent', () => {
  let component: ContentEditionMagicActionsComponent;
  let fixture: ComponentFixture<ContentEditionMagicActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentEditionMagicActionsComponent]
    });
    fixture = TestBed.createComponent(ContentEditionMagicActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
