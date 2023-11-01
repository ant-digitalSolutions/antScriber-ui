import { Component } from '@angular/core';
import { UserInitTourService } from '../user-init-tour.service';

@Component({
  selector: 'app-walkthrough-tour',
  templateUrl: './walkthrough-tour.component.html',
  styleUrls: ['./walkthrough-tour.component.scss']
})
export class WalkthroughTourComponent {

  constructor(private _userWalkthroughTours: UserInitTourService) {


  }

  ngAfterViewInit(): void {
    //TODO: implement logic to check if we should run the walkthrough

    this._userWalkthroughTours.initShepherd_userInitialization()
  }
}
