import { Component, Input, SimpleChanges } from '@angular/core';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-webpages-cards',
  templateUrl: './list-webpages-cards.component.html',
  styleUrls: ['./list-webpages-cards.component.scss']
})
export class ListWebpagesCardsComponent {

  @Input()
  webpagesToRender: WebpageDetailsDto[] = [];

  articleSelected: { articleId: number, isSelected: boolean }[];

  constructor(private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['webpagesToRender']) {
     
    }
  }

  selectWebpage(webpage: WebpageDetailsDto) {
    this.router.navigate([`websites/editor/${webpage.id}`])
  }
}
