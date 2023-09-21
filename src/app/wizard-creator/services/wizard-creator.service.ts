import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WizardCreatorCreateDto } from '../dtos/wizard-creator-create-dto';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, tap } from 'rxjs';

@Injectable()
export class WizardCreatorService {


  baseUrl = environment.apiUrl + 'wizard-creator';

  private _wizardCreatedContent = new ReplaySubject<string | null>();
  wizardCreatedContent$ = this._wizardCreatedContent.asObservable();


  constructor(private http: HttpClient, private toastr: ToastrService) { }

  generateContent(params: WizardCreatorCreateDto) {
    return this.http.post<IRequestResponse<string>>(this.baseUrl + '/generate',  params )
      .pipe(tap(r => {
        if (r.success) {
          this._wizardCreatedContent.next(r.data!);
        } else {
          this.toastr.error(r.error);
          this._wizardCreatedContent.next(null);
        }
      }))
  }

}
