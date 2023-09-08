import { TestBed } from '@angular/core/testing';

import { BlogProjectsService } from './blog-projects.service';

describe('BlogProjectsService', () => {
  let service: BlogProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
