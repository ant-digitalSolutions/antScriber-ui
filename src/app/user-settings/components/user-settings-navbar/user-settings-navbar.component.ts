import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-user-settings-navbar',
  templateUrl: './user-settings-navbar.component.html',
  styleUrls: ['./user-settings-navbar.component.scss']
})
export class UserSettingsNavbarComponent implements OnInit {

  options = this.settings.getOptions();

  constructor(private settings: CoreService,) {

  }

  ngOnInit(): void {

  }

  toggleSidebar() {
    this.options.sidenavOpened = !this.options.sidenavOpened;
  }


  public get isMobileScreen(): boolean {
    return window.innerWidth < 960;
  }


}
