import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWithSingleInputComponent } from './dialog-with-single-input.component';

describe('DialogWithSingleInputComponent', () => {
  let component: DialogWithSingleInputComponent;
  let fixture: ComponentFixture<DialogWithSingleInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogWithSingleInputComponent]
    });
    fixture = TestBed.createComponent(DialogWithSingleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
