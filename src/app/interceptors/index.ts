import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../common/interceptors/loading-interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorHandlingInterceptor } from './error-handling.interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },


];