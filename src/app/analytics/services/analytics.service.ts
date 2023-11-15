import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { IWordsUsageDto } from '../dtos/word-usage.dto';
import { WordsUsageByDay } from '../dtos/words-usage-by-day.dot';

@Injectable()
export class AnalyticsService {
  baseUrl = getBaseApiURL() + 'analytics/';

  constructor(private _http: HttpClient) {}

  getWordsUsage(): Observable<IRequestResponse<IWordsUsageDto>> {
    return this._http.get<IRequestResponse<IWordsUsageDto>>(
      this.baseUrl + 'words-usage'
    );
  }

  getWordsUsageByDay(
    selectedMonth?: Date
  ): Observable<IRequestResponse<WordsUsageByDay[]>> {
    if (!selectedMonth) {
      selectedMonth = new Date();
    }
    const params = new HttpParams().set(
      'selectedMonth',
      selectedMonth.toISOString()
    );
    return this._http.get<IRequestResponse<WordsUsageByDay[]>>(
      this.baseUrl + 'words-usage-by-day',
      { params }
    );
  }

  getOldestDateOfData(): Observable<IRequestResponse<Date>> {
    return this._http.get<IRequestResponse<Date>>(
      this.baseUrl + 'oldest-date-of-data'
    );
  }
}
