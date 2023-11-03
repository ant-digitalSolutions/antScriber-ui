import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private _loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this._loadingService._loadingSubject.next(true);

        return next.handle(req)
            .pipe(
                // Log when response observable either completes or errors
                finalize(() => {
                    this._loadingService._loadingSubject.next(false);
                })
            );
    }
}