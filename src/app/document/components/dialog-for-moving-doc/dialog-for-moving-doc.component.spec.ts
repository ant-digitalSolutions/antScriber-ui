import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForMovingDocComponent } from './dialog-for-moving-doc.component';

describe('DialogForMovingDocComponent', () => {
  let component: DialogForMovingDocComponent;
  let fixture: ComponentFixture<DialogForMovingDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogForMovingDocComponent]
    });
    fixture = TestBed.createComponent(DialogForMovingDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
