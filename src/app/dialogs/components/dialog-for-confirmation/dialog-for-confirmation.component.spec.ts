import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForConfirmationComponent } from './dialog-for-confirmation.component';

describe('DialogForConfirmationComponent', () => {
  let component: DialogForConfirmationComponent;
  let fixture: ComponentFixture<DialogForConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogForConfirmationComponent]
    });
    fixture = TestBed.createComponent(DialogForConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
