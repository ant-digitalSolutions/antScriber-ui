import { TestBed } from '@angular/core/testing';

import { ArticleIdeasService } from './article-ideas.service';

describe('ArticleIdeasService', () => {
  let service: ArticleIdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleIdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
