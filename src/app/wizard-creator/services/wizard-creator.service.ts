import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, of, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { DocumentService } from 'src/app/document/services/document.service';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { WizardCreatorCreateDto } from '../dtos/wizard-creator-create-dto';
import { WizardUseCaseService } from './use-case/wizard-use-case.service';
import { WizardFormService } from './wizard-form.service';

@Injectable()
export class WizardCreatorService {

  baseUrl = getBaseApiURL() + 'wizard-creator';

  private _wizardCreatedContent = new ReplaySubject<string | null>();
  wizardCreatedContent$ = this._wizardCreatedContent.asObservable();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private _docService: DocumentService,
    private _wizardForm: WizardFormService,
    private _snackBar: MatSnackBar,
    protected $gaService: GoogleAnalyticsService,
    private _useCaseService: WizardUseCaseService) { }

  generateContent() {
    const formData = new WizardCreatorCreateDto();

    formData.data = this._wizardForm.additionalData;

    if (!this._wizardForm.checkAdditionalData()) {
      this._snackBar.open(`Oops, something's not right in the form.`, undefined, {
        duration: 2000,
        panelClass: 'snack-warning'
      });
      return of({});
    }


    // log event in GA
    // this.$gaService.event('wizard_create_request','request_to_server', `${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`, 100);
    const wizardRequestStart = new Date().getTime();

    return this.http.post<IRequestResponse<string>>(this.baseUrl + '/generate', formData)
      .pipe(tap(r => {
        let wizardRequestElapsedTime = new Date().getTime() - wizardRequestStart;

        if (r.success) {
          this._wizardCreatedContent.next(r.data!);

          const newDocName = formData.data.description ?
            formData.data.description.substring(0, 50)
            : `${formData.data.useCaseGroup} - ${formData.data.useCase}`;

          this._docService.handleNewContent(newDocName, r.data!);
        } else {
          this.$gaService.event('wizard_create_request_error', `${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`, r.error, 100);

          this.toastr.error(r.error);
          this._wizardCreatedContent.next(null);
        }

        this.$gaService.event('wizard_create_request', 'request_to_server', `${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`, wizardRequestElapsedTime / 1000);
        this.$gaService.event('request_to_server_timing', `wizard_${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`, `${wizardRequestElapsedTime / 1000}`);
      }))
  }
}
