import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { AppSearchDialogComponent } from '../full/vertical/header/header.component';
import { BrandingComponent } from '../full/vertical/sidebar/branding.component';
import { HeaderMenuItemsComponent } from './header-menu-items/header-menu-items.component';

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

  isLoading: boolean;
  userPaysSubscription: boolean;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private blogProjectService: BlogProjectsService,
    private _loadingService: LoadingService,
    private paymentService: PaymentService,
    private _notificationsService: NotificationsService
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
  onNotificationsClick() {
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
 
}

