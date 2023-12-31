import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Subscription } from 'rxjs';
import { AppSettings } from 'src/app/app.config';
import { MaterialModule } from 'src/app/material.module';
import { CoreService } from 'src/app/services/core.service';
import { NavService } from 'src/app/services/nav.service';
import { AppHorizontalHeaderComponent } from '../full/horizontal/header/header.component';
import { AppHorizontalSidebarComponent } from '../full/horizontal/sidebar/sidebar.component';
import { AppBreadcrumbComponent } from '../full/shared/breadcrumb/breadcrumb.component';
import { CustomizerComponent } from '../full/shared/customizer/customizer.component';
import { AppSearchDialogComponent, HeaderComponent } from '../full/vertical/header/header.component';
import { AppNavItemComponent } from '../full/vertical/sidebar/nav-item/nav-item.component';
import { navItems } from '../full/vertical/sidebar/sidebar-data';
import { SidebarComponent } from '../full/vertical/sidebar/sidebar.component';
import { HeaderMainComponent } from '../header-main/header-main.component';

@Component({
  selector: 'app-layout-wizard',
  templateUrl: './layout-wizard.component.html',
  styleUrls: ['./layout-wizard.component.scss'],
  standalone: true,
  imports: [
    NgScrollbarModule,
    HeaderComponent,
    AppHorizontalHeaderComponent,
    AppHorizontalSidebarComponent,
    SidebarComponent,
    AppBreadcrumbComponent,
    AppSearchDialogComponent,
    CustomizerComponent,
    MaterialModule,
    RouterModule,
    CommonModule,
    AppNavItemComponent,
    HeaderMainComponent
  ],
})
export class LayoutWizardComponent {
  navItems = navItems;
  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  //get options from service
  options = this.settings.getOptions();
  navopt = this.navService.showClass;
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }

  constructor(
    private settings: CoreService,
    private navService: NavService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

        if (this.options.sidenavCollapsed == false) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
        this.resView = state.breakpoints[BELOWMONITOR];
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}


const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';