import { Component } from '@angular/core';
import { UserInitTourService } from '../user-init-tour.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-walkthrough-tour',
  templateUrl: './walkthrough-tour.component.html',
  styleUrls: ['./walkthrough-tour.component.scss']
})
export class WalkthroughTourComponent {

  constructor(
    private _userWalkthroughTours: UserInitTourService,
    private _userService: UserService) {


  }

  ngAfterViewInit(): void {
    this.checkAndRenderInitialWalkthrough()
    // setTimeout(() => this.checkAndRenderInitialWalkthrough(), 300)
  
  }

  checkAndRenderInitialWalkthrough() {
    if (this._userService.showInitialTour)
      this._userWalkthroughTours.initShepherd_userInitialization()
  }
}
