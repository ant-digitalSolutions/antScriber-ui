import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRequestResponse } from '../dto/request-response.dto';
import { MagicEditionParamsDto } from '../dto/magic-edition-params.dto';
import { MagicActionEnum } from '../enum/content generation/magic-action.enum';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic'

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
