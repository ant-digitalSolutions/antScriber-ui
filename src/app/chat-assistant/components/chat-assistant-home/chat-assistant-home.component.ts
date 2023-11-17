import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CoreService } from 'src/app/services/core.service';
import { ChatInputService } from '../../services/chat-input.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

@Component({
  selector: 'app-chat-assistant-home',
  templateUrl: './chat-assistant-home.component.html',
  styleUrls: ['./chat-assistant-home.component.scss'],
})
export class ChatAssistantHomeComponent implements OnInit, AfterViewInit  {
  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  _sidenavMode: MatDrawerMode = 'side'

  @ViewChild('mainContent') mainContent: ElementRef;

  private layoutChangesSubscription = Subscription.EMPTY;

  options = this.settings.getOptions();
  isMobileScreen: boolean;


  constructor(
    private _chatInputService: ChatInputService,
    private breakpointObserver: BreakpointObserver,
    private settings: CoreService,
  ) {
  }

  ngAfterViewInit(): void {
    this.setListeners();

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.layoutChangesSubscription.unsubscribe();
  }

  setListeners() {
    this._chatInputService.chatInputRowsChanged.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(h => {
      this.adjustHeight(h);
    })

    this.layoutChangesSubscription = this.breakpointObserver
    .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
    .subscribe((state) => {
      // SidenavOpened must be reset true when layout changes
      this.options.sidenavOpened = false;
      this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
  
      if (this.options.sidenavCollapsed == false) {
        this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
      }
      // this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
      // this.resView = state.breakpoints[BELOWMONITOR];
    });
  }



  private adjustHeight(height: string): void {
    if (this.mainContent && this.mainContent.nativeElement) {
      const computedHeight = height.length === 0 ? `calc(100vh - 150px)` :  `calc(100vh - 130px - ${height})`;
     
      this.mainContent.nativeElement.style.height = computedHeight;
    }
  }

  
  public get sidenavMode() : MatDrawerMode {
    return this.isMobileScreen ? 'push' : 'side';
  }

  
  public get sidenavOpened() : boolean {
    return !this.isMobileScreen ? true : this.options.sidenavOpened ;
  }
  
  

}
