import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WizardCreatorCreateDto } from '../dtos/wizard-creator-create-dto';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, of, tap } from 'rxjs';
import { DocumentService } from 'src/app/document/services/document.service';
import { WizardFormService } from './wizard-form.service';

@Injectable()
export class WizardCreatorService {


  baseUrl = environment.apiUrl + 'wizard-creator';

  private _wizardCreatedContent = new ReplaySubject<string | null>();
  wizardCreatedContent$ = this._wizardCreatedContent.asObservable();

 

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private _docService: DocumentService,
    private _wizardForm: WizardFormService) { }

  generateContent() {
    const formData = new WizardCreatorCreateDto();

    formData.data = this._wizardForm.additionalData;

    if (!this._wizardForm.checkAdditionalData()) {
      this.toastr.error('Please check your data');
      return of({});
    }

    return this.http.post<IRequestResponse<string>>(this.baseUrl + '/generate', formData)
      .pipe(tap(r => {
        if (r.success) {
          this._wizardCreatedContent.next(r.data!);

          const newDocName = formData.data.description ?
            formData.data.description.substring(0, 50)
            : `${formData.data.useCaseGroup} - ${formData.data.useCase}`;

          this._docService.handleNewContent(newDocName, r.data!);
        } else {
          this.toastr.error(r.error);
          this._wizardCreatedContent.next(null);
        }
      }))
  }
}
