import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListSidebarComponent } from './chat-list-sidebar.component';

describe('ChatListSidebarComponent', () => {
  let component: ChatListSidebarComponent;
  let fixture: ComponentFixture<ChatListSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatListSidebarComponent]
    });
    fixture = TestBed.createComponent(ChatListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
