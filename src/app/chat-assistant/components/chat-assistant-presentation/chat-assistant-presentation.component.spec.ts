import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAssistantPresentationComponent } from './chat-assistant-presentation.component';

describe('ChatAssistantPresentationComponent', () => {
  let component: ChatAssistantPresentationComponent;
  let fixture: ComponentFixture<ChatAssistantPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatAssistantPresentationComponent]
    });
    fixture = TestBed.createComponent(ChatAssistantPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
