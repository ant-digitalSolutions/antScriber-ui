import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { ArticleIdeasService } from '../article-ideas.service';
import { ArticleIdea } from './../../dtos/article-ideas-from-ai.dto';

@Component({
  selector: 'app-list-article-ideas',
  templateUrl: './list-article-ideas.component.html',
  styleUrls: ['./list-article-ideas.component.scss']
})
export class ListArticleIdeasComponent {

  componentDestroyed$: Subject<boolean> = new Subject();

  articleIdeas: ArticleIdea[];

  primaryKeywordsList: string[];

  searchTerm: string;

  constructor(private articleIdeasService: ArticleIdeasService, private blogProjectService: BlogProjectsService) {

  }

  ngOnInit(): void {
    this.articleIdeasService.articleIdeas$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.articleIdeas = r;
    })
    this.blogProjectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(projectId => {
      if (projectId && projectId !== -1)
        this.getAllArticleIdeasForCurrentProject(projectId);
    })
    this.articleIdeasService.articleIdeasPrimaryKeywords$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.primaryKeywordsList = r;
    })
  }

  getAllArticleIdeasForCurrentProject(projectId: number) {
    this.articleIdeasService.listArticleIdeasForCurrentProject(projectId).subscribe();
  }

  applySearchFilter() {
    this.articleIdeas = this.articleIdeasService.filterArticleIdeasBySearch(this.searchTerm);
  }
  changePrimaryKeySelection($event: MatSelectChange) {
    this.articleIdeas = this.articleIdeasService.getArticleIdeasByPrimaryKeyword($event.value)
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
