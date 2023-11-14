import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForMessageComponent } from './dialog-for-message.component';

describe('DialogForMessageComponent', () => {
  let component: DialogForMessageComponent;
  let fixture: ComponentFixture<DialogForMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogForMessageComponent]
    });
    fixture = TestBed.createComponent(DialogForMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
