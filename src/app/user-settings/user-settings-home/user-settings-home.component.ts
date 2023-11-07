import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AppSettings } from 'src/app/app.config';
import { CoreService } from 'src/app/services/core.service';
import { NavService } from 'src/app/services/nav.service';
import { userSettingsNavItems } from '../data/settings-sidebar-data';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

@Component({
  selector: 'app-user-settings-home',
  templateUrl: './user-settings-home.component.html',
  styleUrls: ['./user-settings-home.component.scss']
})
export class UserSettingsHomeComponent implements OnInit {

  navItems = userSettingsNavItems;

  // private isMobileScreen = false;

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;

  //get options from service
  options = this.settings.getOptions();
  navopt = this.navService.showClass;
  private layoutChangesSubscription = Subscription.EMPTY;
  // private isContentWidthFixed = true;
  // private isCollapsedWidthFixed = false;
  // private htmlElement!: HTMLHtmlElement;

  sidebarMode: 'over' | 'push' | 'side' = 'push';

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private settings: CoreService,
    // private mediaMatcher: MediaMatcher,
    private navService: NavService,
    private breakpointObserver: BreakpointObserver
  ) {
    // this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = false;
        // this.isMobileScreen = state.breakpoints[MOBILE_VIEW];

        if (this.options.sidenavCollapsed == false) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
        // this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        // this.resView = state.breakpoints[BELOWMONITOR];
      });

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }


  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    // this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    // this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    // this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
  }

  ngOnInit(): void {
    // this.isMobileScreen = window.innerWidth < 960;
    if (this.isMobileScreen) {
      this.sidebarMode = 'over'
    }
  }


  public get isMobileScreen(): boolean {
    return window.innerWidth < 960;
  }


  public get sidebarIsOpen(): boolean {
    if (!this.isMobileScreen) {
      return true
    }

    return this.options.sidenavOpened;
  }



}
