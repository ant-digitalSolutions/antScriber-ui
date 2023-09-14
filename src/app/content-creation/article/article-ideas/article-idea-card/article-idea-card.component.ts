import { Component, Input } from '@angular/core';
import { ArticleIdea } from '../../dtos/article-ideas-from-ai.dto';
import { ArticleIdeasService } from '../article-ideas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-idea-card',
  templateUrl: './article-idea-card.component.html',
  styleUrls: ['./article-idea-card.component.scss']
})
export class ArticleIdeaCardComponent {

  @Input()
  articleIdea: ArticleIdea;

  constructor(private articleIdeaService: ArticleIdeasService, private router: Router) {

  }

  generateFullArticle() {
    this.articleIdeaService.setArticleIdeaToGenerateArticle(this.articleIdea);
    this.router.navigate(['/blogger/articles/generate'])

  }
  details() {
    throw new Error('Method not implemented.');
  }

}
