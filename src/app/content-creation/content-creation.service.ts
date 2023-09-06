import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICompletionText } from './dto/ICompletionText.dto';
import { Observable } from 'rxjs';
import { IOpenAiMessage } from './dto/openAi-choice.dto';

@Injectable()
export class ContentCreationService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  generateContentForChat(prompt: ICompletionText): Observable<IOpenAiMessage> {
    return this.http.post<IOpenAiMessage>(this.baseUrl + 'ai/chat', prompt);
  }
}
