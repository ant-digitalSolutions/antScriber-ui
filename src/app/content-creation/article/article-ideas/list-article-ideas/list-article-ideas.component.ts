import { ArticleIdea, ArticleIdeasResponse } from './../../dtos/article-ideas-from-ai.dto';
import { Component } from '@angular/core';
import { ArticleIdeasService } from '../article-ideas.service';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';

@Component({
  selector: 'app-list-article-ideas',
  templateUrl: './list-article-ideas.component.html',
  styleUrls: ['./list-article-ideas.component.scss']
})
export class ListArticleIdeasComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  articleIdeas: ArticleIdea[];

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
  }

  getAllArticleIdeasForCurrentProject(projectId: number) {
   this.articleIdeasService.listArticleIdeasForCurrentProject(projectId).subscribe();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
}
