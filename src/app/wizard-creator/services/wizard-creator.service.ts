import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ReplaySubject, catchError, of, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { WizardCreatorCreateDto } from '../dtos/wizard-creator-create-dto';
import { WizardUseCaseService } from './use-case/wizard-use-case.service';
import { WizardFormService } from './wizard-form.service';
import { EventsHubService } from 'src/app/events-hub/events-hub.service';
import { EventType } from 'src/app/events-hub/enums/event-type.enum';

@Injectable()
export class WizardCreatorService {
  baseUrl = getBaseApiURL() + 'wizard-creator';

  private _wizardCreatedContent = new ReplaySubject<string | null>();
  wizardCreatedContent$ = this._wizardCreatedContent.asObservable();

  constructor(
    private http: HttpClient,
    private _wizardForm: WizardFormService,
    private _snackBar: MatSnackBar,
    protected $gaService: GoogleAnalyticsService,
    private _useCaseService: WizardUseCaseService,
    private _eventHub: EventsHubService
  ) {}

  generateContent() {
    const formData = new WizardCreatorCreateDto();

    formData.data = this._wizardForm.additionalData;

    if (!this._wizardForm.checkAdditionalData()) {
      this._snackBar.open(
        `Oops, something's not right in the form.`,
        undefined,
        {
          duration: 2000,
          panelClass: 'snack-warning',
        }
      );
      return of({});
    }

    // log event in GA
    // this.$gaService.event('wizard_create_request','request_to_server', `${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`, 100);
    const wizardRequestStart = new Date().getTime();
    this.setUpDocumentForResponse(formData);

    return this.http
      .post<IRequestResponse<string>>(this.baseUrl + '/generate', formData)
      .pipe(
        tap((r) => {
          let wizardRequestElapsedTime =
            new Date().getTime() - wizardRequestStart;

          if (r.success) {
            this._wizardCreatedContent.next(r.data!);
          } else {
            this.$gaService.event(
              'wizard_create_request_error',
              `${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`,
              r.error,
              100
            );

            // this._wizardCreatedContent.next(null);
          }

          const gptVersionRaw = formData.data.gptVersion as string;
          const gptVersion = gptVersionRaw.substring(
            gptVersionRaw.indexOf('(') + 1,
            gptVersionRaw.length - 1
          );
          this.$gaService.event(
            'wizard_create_request',
            'request_to_server',
            `${this._useCaseService._wizardUseCaseGroup}<->${this._useCaseService._wizardUseCase}`,
            wizardRequestElapsedTime / 1000
          );
          this.$gaService.event(
            'request_to_server_timing',
            `${gptVersion}__${this._useCaseService._wizardUseCase}`,
            `${wizardRequestElapsedTime / 1000}`
          );
        }),
        catchError((error: any) => this.handleRequestHttpError(error))
      );
  }

  setUpDocumentForResponse(formData: any) {
    const newDocName = formData.data.description
      ? formData.data.description.substring(0, 50)
      : `${formData.data.useCaseGroup} - ${formData.data.useCase}`;
    this._eventHub.emit(EventType.documentSetUpForResponse, newDocName);
  }

  handleRequestHttpError(error: any) {
    this.$gaService.event(
      'wizard_create_request_failure',
      'request_to_server',
      error.message,
      0
    );

    // Log error here or perform other error handling actions
    console.error('An error occurred:', error.error);
    return of({
      suscess: false,
      message: `Reached subscription's limits`,
    }); // Emit null or an appropriate default value
  }
}
