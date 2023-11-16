import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputFieldComponent } from './chat-input-field.component';

describe('ChatInputFieldComponent', () => {
  let component: ChatInputFieldComponent;
  let fixture: ComponentFixture<ChatInputFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatInputFieldComponent]
    });
    fixture = TestBed.createComponent(ChatInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
