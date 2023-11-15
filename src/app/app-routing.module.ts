import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { BlankComponent } from './layouts/blank/blank.component';
import { LayoutWizardComponent } from './layouts/layout-wizard/layout-wizard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'wizard/creator',
    pathMatch: 'full'
  },
  {
    path: 'wizard',
    component: LayoutWizardComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./wizard-creator/wizard-creator.module').then((m) => m.WizardCreatorModule),
        data: { breadcrumb: 'Home' }
      },
    ],
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./user-settings/user-settings.module').then((m) => m.UserSettingsModule),
    canActivate: [authGuard]
  },
  {
    path: 'chat-assistant',
    loadChildren: () =>
      import('./chat-assistant/chat-assistant.module').then(
        (m) => m.ChatAssistantModule
      ),
    canActivate: [authGuard],
  },
  // {
  //   path: '',
  //   component: FullComponent,
  //   children: [


  //     {
  //       path: 'content',
  //       loadChildren: () =>
  //         import('./content-creation/content-creation.module').then((m) => m.ContentCreationModule),
  //     },
  //     {
  //       path: 'blogger',
  //       loadChildren: () =>
  //         import('./blogger/blogger.module').then((m) => m.BloggerModule),
  //     },
  //     {
  //       path: 'websites',
  //       loadChildren: () =>
  //         import('./website/website.module').then((m) => m.WebsiteModule),
  //     },
  //     //template routes
  //     {
  //       path: '',
  //       redirectTo: '/dashboards/dashboard1',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'starter',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/pages.module').then((m) => m.PagesModule),
  //     },
  //     {
  //       path: 'dashboards',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/dashboards/dashboards.module').then(
  //           (m) => m.DashboardsModule
  //         ),
  //     },
  //     {
  //       path: 'ui-components',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/ui-components/ui-components.module').then(
  //           (m) => m.UicomponentsModule
  //         ),
  //     },
  //     {
  //       path: 'forms',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/forms/forms.module').then((m) => m.FormModule),
  //     },
  //     {
  //       path: 'charts',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/charts/charts.module').then((m) => m.ChartsModule),
  //     },
  //     {
  //       path: 'apps',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/apps/apps.module').then((m) => m.AppsModule),
  //     },
  //     {
  //       path: 'widgets',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/widgets/widgets.module').then((m) => m.WidgetsModule),
  //     },
  //     {
  //       path: 'tables',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/tables/tables.module').then((m) => m.TablesModule),
  //     },
  //     {
  //       path: 'theme-pages',
  //       loadChildren: () =>
  //         import('./template-bundle/pages/theme-pages/theme-pages.module').then(
  //           (m) => m.ThemePagesModule
  //         ),
  //     },
  //   ],
  //   canActivate: [authGuard]
  // },
  {
    path: 'auth',
    component: BlankComponent,
    children: [


      // template
      // {
      //   path: 'authentication',
      //   loadChildren: () =>
      //     import('./template-bundle/pages/authentication/authentication.module').then(
      //       (m) => m.AuthenticationModule
      //     ),
      // },
      // {
      //   path: 'landingpage',
      //   loadChildren: () =>
      //     import('./template-bundle/pages/theme-pages/landingpage/landingpage.module').then(
      //       (m) => m.LandingPageModule
      //     ),
      // },
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: 'authentication/error',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
