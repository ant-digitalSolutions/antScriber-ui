import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAssistantHomeComponent } from './chat-assistant-home.component';

describe('ChatAssistantHomeComponent', () => {
  let component: ChatAssistantHomeComponent;
  let fixture: ComponentFixture<ChatAssistantHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatAssistantHomeComponent]
    });
    fixture = TestBed.createComponent(ChatAssistantHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
