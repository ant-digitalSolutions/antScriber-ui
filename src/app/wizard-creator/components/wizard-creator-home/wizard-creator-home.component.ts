import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { UserService } from 'src/app/user/services/user.service';
import { UserInitTourService } from 'src/app/walkthrough-tours/user-init-tour.service';

@Component({
  selector: 'app-wizard-creator-home',
  templateUrl: './wizard-creator-home.component.html',
  styleUrls: ['./wizard-creator-home.component.scss']
})
export class WizardCreatorHomeComponent implements OnDestroy, OnInit, AfterViewInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  isMobile = false;

  selectedTabIndex = 0;

  constructor(
    private _wizard: WizardCreatorService,
    private breakpointObserver: BreakpointObserver,
    protected $gaService: GoogleAnalyticsService,
    private _projectService: BlogProjectsService,
    private _userWalkthroughTours: UserInitTourService,
    private _userService: UserService) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
    this._projectService.refreshProjects();

    this.setListeners();
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile.bind(this), false);

    this.$gaService.event('user_wizard_engagement', 'page_on_init', 'wizard_home_page');

  }

  ngAfterViewInit(): void {
    this.checkAndRenderInitialWalkthrough()
  }

  setListeners() {
    this._wizard.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        if (this.isMobile) {
          this.selectedTabIndex = 1;
        }
      })
  }

  scrollToBottom(): void {
    try {
      const wizardContent = document.querySelector('.wizard-content');
      wizardContent!.scrollTop = wizardContent!.scrollHeight;
    } catch (err) {
      console.error(`Error Scrolling the content: ${err}`)
    }
  }

  checkIfMobile() {
    this.isMobile = (window.innerWidth < 960);
  }

  checkAndRenderInitialWalkthrough() {
    // if (this._userService.showInitialTour)
      this._userWalkthroughTours.initShepherd_userInitialization()
  }

}
