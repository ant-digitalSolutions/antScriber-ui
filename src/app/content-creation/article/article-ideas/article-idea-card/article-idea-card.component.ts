import { Component, Input } from '@angular/core';
import { ArticleIdea } from '../../dtos/article-ideas-from-ai.dto';

@Component({
  selector: 'app-article-idea-card',
  templateUrl: './article-idea-card.component.html',
  styleUrls: ['./article-idea-card.component.scss']
})
export class ArticleIdeaCardComponent {

  @Input()
  articleIdea: ArticleIdea;

  generateFullArticle() {
    throw new Error('Method not implemented.');
  }
  details() {
    throw new Error('Method not implemented.');
  }

}
