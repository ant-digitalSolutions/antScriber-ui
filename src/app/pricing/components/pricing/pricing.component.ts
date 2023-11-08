import { Component } from '@angular/core';
import { cardPricing_standard } from '../../data/card-pricing-standard.data';
import { IPriceCardData } from '../../dto/pricing-card-data.interface';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class AppPricingComponent {
  annualPricing = true;

  // yearlyPrice: any = (a: any, b: number) => ;



  // card 1
  pricecards: IPriceCardData[] = cardPricing_standard;

  constructor() { }

  yearlyPrice(cardData: IPriceCardData) {
    return Math.round((cardData.planOriginalPrice * 12 - cardData.planOriginalPrice * 12 * (cardData.planAnnualPercentOff! / 100)) / 12);
  }
}
