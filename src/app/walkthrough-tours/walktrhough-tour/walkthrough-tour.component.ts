import { EventsHubService } from './../../events-hub/events-hub.service';
import { Component, OnDestroy } from '@angular/core';
import { UserInitTourService } from '../user-init-tour.service';
import { Subject, takeUntil } from 'rxjs';
import { EventType } from 'src/app/events-hub/enums/event-type.enum';

@Component({
  selector: 'app-walkthrough-tour',
  templateUrl: './walkthrough-tour.component.html',
  styleUrls: ['./walkthrough-tour.component.scss']
})
export class WalkthroughTourComponent implements OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();


  constructor(
    private _userWalkthroughTours: UserInitTourService,
    private _eventHub: EventsHubService) {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngAfterViewInit(): void {
    this._eventHub.EventEmitter.pipe(takeUntil(this.componentDestroyed$)).subscribe(e => {
      if (e.type === EventType.UserFirstSessionEver) {
        setTimeout(() => this._userWalkthroughTours.initShepherd_userInitialization(), 1000)
      }
    })
  }
}
