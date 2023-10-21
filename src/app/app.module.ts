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
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderMainComponent } from './layouts/header-main/header-main.component';
import { LayoutWizardComponent } from './layouts/layout-wizard/layout-wizard.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

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
    NgxGoogleAnalyticsModule.forRoot('G-XQVZWP9SRY')

  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    httpInterceptorProviders
  ]
})
export class AppModule {}
