import { TestBed } from '@angular/core/testing';

import { UserInitTourService } from './user-init-tour.service';

describe('UserInitTourService', () => {
  let service: UserInitTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInitTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
