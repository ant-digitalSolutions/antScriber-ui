import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestResponse } from '../dto/request-response.dto';
import { MagicEditionParamsDto } from '../dto/magic-edition-params.dto';

@Injectable()
export class MagicEditionService {

  baseUrl = environment.apiUrl + 'magic-edition/';

  constructor(private http: HttpClient) { }

  improveText(text: string): Observable<IRequestResponse<string>> {
    const params: MagicEditionParamsDto = {
      text: text
    }
    return this.http.post<IRequestResponse<string>>(this.baseUrl + 'improve', params)
  }
}
