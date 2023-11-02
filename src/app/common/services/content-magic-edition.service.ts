import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { MagicEditionParamsDto } from '../dto/magic-edition-params.dto';
import { IRequestResponse } from '../dto/request-response.dto';
import { MagicActionEnum } from '../enum/content generation/magic-action.enum';

@Injectable()
export class MagicEditionService {

  baseUrl = getBaseApiURL() + 'magic-edition/';

  constructor(private http: HttpClient) { }

  improveText(text: string): Observable<IRequestResponse<string>> {
    const params: MagicEditionParamsDto = {
      text: text,
      magicActionType: MagicActionEnum.improve
    }
    return this.http.post<IRequestResponse<string>>(this.baseUrl + 'improve', params)
  }

  applyMagic(text: string, actionType: MagicActionEnum): Observable<IRequestResponse<string>> {
    const params: MagicEditionParamsDto = {
      text: text,
      magicActionType: actionType
    }
    return this.http.post<IRequestResponse<string>>(this.baseUrl + 'apply-magic', params)
  }
}
