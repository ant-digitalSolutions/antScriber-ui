import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BlogProjectDetailsDto } from 'src/app/blogger/dto/blog-project-details.dto';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { MaterialModule } from 'src/app/material.module';
import { NotificationsModule } from 'src/app/notifications/notifications.module';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { PaymentService } from 'src/app/payment/services/payment.service';
import { CoreService } from 'src/app/services/core.service';
import { AppSearchDialogComponent } from '../full/vertical/header/header.component';
import { BrandingComponent } from '../full/vertical/sidebar/branding.component';
import { HeaderMenuItemsComponent } from './header-menu-items/header-menu-items.component';
import {  MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    BrandingComponent,
    NgFor,
    NgIf,
    AppSearchDialogComponent,
    HeaderMenuItemsComponent,
    NotificationsModule,
  ],
})
export class HeaderMainComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  permanentAdfluensProductLink: string;

  componentDestroyed$: Subject<boolean> = new Subject();

  blogProjects: BlogProjectDetailsDto[] = [];

  selectedBlogProjectId: number;

  showFiller = false;

  coreOptions = this.coreService.getOptions();

  @ViewChild('notificationMenu') notificationTrigger: MatMenu;

  selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: '/assets/images/flag/icon-flag-en.svg',
  };

  public languages: any[] = [
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: '/assets/images/flag/icon-flag-en.svg',
    },
    {
      language: 'Español',
      code: 'es',
      icon: '/assets/images/flag/icon-flag-es.svg',
    },
    {
      language: 'Français',
      code: 'fr',
      icon: '/assets/images/flag/icon-flag-fr.svg',
    },
    {
      language: 'German',
      code: 'de',
      icon: '/assets/images/flag/icon-flag-de.svg',
    },
  ];
  isLoading: boolean;
  userPaysSubscription: boolean;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private blogProjectService: BlogProjectsService,
    private _loadingService: LoadingService,
    private paymentService: PaymentService,
    private _notificationsService: NotificationsService,
    private coreService: CoreService
  ) {
  }

  ngOnInit(): void {
    this.setListeners();
    this.retrieveUserSubscriptionType();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  /**
   *
   *
   * @memberof HeaderMainComponent
   */
  onNotificationsClick(_event: MouseEvent) {

    if (this._notificationsService.hasNotifications) {
      const notificationTrigger = document.getElementById('notification-menu-trigger');
      notificationTrigger?.click();
    }

    this._notificationsService.markMultipleAsSeen().subscribe(r => {
      if (r.success) {
        this._notificationsService.resetNotificationCount()
      }
    });
  }

  setListeners() {
    this.blogProjectService.blogProjects$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((projects) => {
        this.blogProjects = projects;
        if (!this.selectedBlogProjectId && projects.length > 0) {
          this.selectedBlogProjectId = this.blogProjects.filter(
            (p) => p.isDefaultProject
          )[0].id;
          this.blogProjectService.selectedProjectId =
            this.selectedBlogProjectId;
        }
      });

    this._loadingService.loadingEvent$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((isLoading) => (this.isLoading = isLoading));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AppSearchDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  retrieveUserSubscriptionType() {
    this.paymentService.getUserSubscriptionType().subscribe((response) => {
      if (response) {
        this.userPaysSubscription = response.data as boolean;
      }
    });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  selectCurrentProject(selectedProject: number) {
    this.blogProjectService.selectedProjectId = selectedProject;
  }

 
 public get unseenNotifications() : number {
  return this._notificationsService.unseenNotifications
 }
 
  toggleSidenav() {
    this.coreOptions.sidenavOpened = !this.coreOptions.sidenavOpened;
  }

  notifications: notifications[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'New message received',
      subtitle: 'Salma sent you new message',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'New Payment received',
      subtitle: 'Check your earnings',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'Jolly completed tasks',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Roman Joined the Team!',
      subtitle: 'Congratulate him',
    },
  ];

  msgs: msgs[] = [
    {
      id: 1,
      img: '/assets/images/profile/user-1.jpg',
      title: 'Andrew McDownland',
      subtitle: 'Message blocked. Try Again',
    },
    {
      id: 2,
      img: '/assets/images/profile/user-2.jpg',
      title: 'Christopher Jamil',
      subtitle: 'This message cannot be sent',
    },
    {
      id: 3,
      img: '/assets/images/profile/user-3.jpg',
      title: 'Julia Roberts',
      subtitle: 'You are trying to reach location.',
    },
    {
      id: 4,
      img: '/assets/images/profile/user-4.jpg',
      title: 'James Johnson',
      subtitle: 'Assign her new tasks',
    },
    {
      id: 5,
      img: '/assets/images/profile/user-5.jpg',
      title: 'Maria Rodriguez',
      subtitle: 'Congrats for your success',
    },
  ];

  profiledd: profiledd[] = [
    {
      id: 1,
      img: '/assets/images/svgs/icon-account.svg',
      title: 'My Profile',
      subtitle: 'Account Settings',
      link: '/',
    },
    {
      id: 2,
      img: '/assets/images/svgs/icon-inbox.svg',
      title: 'My Inbox',
      subtitle: 'Messages & Email',
      link: '/apps/email/inbox',
    },
    {
      id: 3,
      img: '/assets/images/svgs/icon-tasks.svg',
      title: 'My Tasks',
      subtitle: 'To-do and Daily Tasks',
      link: '/apps/taskboard',
    },
  ];
}

interface notifications {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface msgs {
  id: number;
  img: string;
  title: string;
  subtitle: string;
}

interface profiledd {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

