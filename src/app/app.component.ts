import { Component, HostListener } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = environment.appName;

  constructor(protected $gaService: GoogleAnalyticsService,) { }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    this.$gaService.event('click', `target_text__${target.innerHTML}`)
  }
}
