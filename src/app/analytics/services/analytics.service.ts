import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { IWordsUsageDto } from '../dtos/word-usage.dto';

@Injectable()
export class AnalyticsService {
  baseUrl = getBaseApiURL() + 'analytics/';

  constructor(private _http: HttpClient) {}

  getWordsUsage(): Observable<IRequestResponse<IWordsUsageDto>> {
    return this._http.get<IRequestResponse<IWordsUsageDto>>(
      this.baseUrl + 'words-usage'
    );
  }
}
