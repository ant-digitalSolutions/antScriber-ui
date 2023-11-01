import { TimeagoModule } from 'ngx-timeago';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FilterPipe } from './pipe/filter.pipe';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { ToastrModule } from 'ngx-toastr';
import { httpInterceptorProviders } from './interceptors';

import { BreadcrumbModule } from 'xng-breadcrumb';
import { RouterModule } from '@angular/router';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

import { JwtModule } from "@auth0/angular-jwt";
import { WalkthroughToursModule } from './walkthrough-tours/walkthrough-tours.module';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['devbrain.adfluens.io', 'brain.adfluens.io', 'localhost:3000'],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgApexchartsModule,
    TablerIconsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      timeOut: 3500,
    }),
    BreadcrumbModule,
    TimeagoModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot(window.location.href.indexOf('app.') >= 0 ? 'G-XQVZWP9SRY' : ''),
    WalkthroughToursModule

  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    httpInterceptorProviders
  ]
})
export class AppModule {}

function tokenGetter() {
  return localStorage.getItem('id_token');
}
