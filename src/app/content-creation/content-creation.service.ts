import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompletionText } from './dto/ICompletionText.dto';
import { Observable } from 'rxjs';
import { IOpenAiMessage } from './dto/openAi-choice.dto';
import { ArticleGenerationParamsDto } from './dto/generate-article.dto';
import { IArticleFromAiResponseDto } from './article/dtos/article-from-ai.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic'

@Injectable()
export class ContentCreationService {


  baseUrl: string = getBaseApiURL();

  constructor(private http: HttpClient) { }

  generateContentForChat(prompt: ICompletionText): Observable<IOpenAiMessage> {
    return this.http.post<IOpenAiMessage>(this.baseUrl + 'ai/chat', prompt);
  }

  generateArticleFromIdea(articleCreationParams: ArticleGenerationParamsDto): Observable<IArticleFromAiResponseDto> {
    return this.http.post<IArticleFromAiResponseDto>(this.baseUrl + 'blogger/article-from-idea', articleCreationParams);
  }
}
