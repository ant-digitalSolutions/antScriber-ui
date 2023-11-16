import { TestBed } from '@angular/core/testing';

import { ChatAssistantsService } from './chat-assistants.service';

describe('ChatAssistantsService', () => {
  let service: ChatAssistantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAssistantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
