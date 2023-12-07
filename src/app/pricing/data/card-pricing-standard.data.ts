import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';
import { determineEnvironment } from 'src/environments/enviroment.dynamic';
import { IPriceCardData } from '../dto/pricing-card-data.interface';

let env = determineEnvironment();

let cardPricing_standard: IPriceCardData[];
if (env === 'local') {
  cardPricing_standard = [
    // {
    //     id: 1,
    //     plan: 'Free',
    //     description: 'Discover the power of Adfluens',
    //     btnText: '',
    //     free: true,
    //     planMonthlyPrice: 0,
    //     planAnnualPercentOff: 1,
    //     planDiscountPercentOff: 1,
    //     rules: [
    //         {
    //             title: '10k words per month',
    //             limit: true,
    //         },
    //         {
    //             title: 'Single Project',
    //             limit: true,
    //         },
    //         {
    //             title: 'Advance Editor',
    //             limit: true,
    //         },
    //         {
    //             title: '25+ languages',
    //             limit: true,
    //         },
    //         {
    //             title: `20+ assistant's tasks`,
    //             limit: true,
    //         },
    //         {
    //             title: `15+ voice tones`,
    //             limit: true,
    //         },
    //         {
    //             title: 'Chat',
    //             limit: false,
    //         },
    //         {
    //             title: 'Create Images',
    //             limit: false,
    //         },
    //     ],
    // },
    {
      index: 2,
      plan: 'Solo',
      description: `Perfect for solo adventurers looking to create impactful content, it provides a robust foundation to start building your presence with essential tools and support.`,
      btnText: 'Upgrade',
      free: false,

      planMonthlyPrice: 15,
      planAnnualPrice: 9.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OAcjdFXqwjYWAm8qXUIhbRR',
      stripeYearlyPriceId: 'price_1OAd4JFXqwjYWAm8upr94XbE',
      id: ProductsEnum.Solo,
      rules: [
        {
          title: '100k words per month',
          limit: true,
        },
        {
          title: 'Up to 3 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 50 Images per month',
          limit: true,
        },
      ],
    },
    {
      index: 3,
      plan: 'Flow',
      description: `Designed for creators who need more room to grow, it offers an expanded set of tools to keep your content flowing and your audience engaged.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 29.99,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OAcl7FXqwjYWAm8s5ssMyck',
      stripeYearlyPriceId: 'price_1OAd2lFXqwjYWAm8hjjbbEMs',
      popular: true,
      id: ProductsEnum.Flow,
      rules: [
        {
          title: '500k words per month',
          limit: true,
        },
        {
          title: 'Up to 10 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
      ],
    },
    {
      index: 4,
      plan: 'Horizon',
      description: `ultimate tier for serious content professionals who want no limits on their creative output, with premium features that cater to expansive projects and diverse needs.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 99,
      planAnnualPrice: 90.99,
      planDiscountPercentOff: 50,
      planAnnualPercentOff: 51,
      stripeMonthlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
      stripeYearlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
      id: ProductsEnum.Horizon,
      rules: [
        {
          title: 'Unlimited words per month',
          limit: true,
        },
        {
          title: 'Up to 25 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
      ],
    },
  ];
} else if (env === 'staging') {
  cardPricing_standard = [
    {
      index: 2,
      plan: 'Solo',
      description: `Perfect for solo adventurers looking to create impactful content, it provides a robust foundation to start building your presence with essential tools and support.`,
      btnText: 'Upgrade',
      free: false,

      planMonthlyPrice: 15,
      planAnnualPrice: 9.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OGs3uHoHvOMDqa7oTpWkv8R',
      stripeYearlyPriceId: 'price_1OGs3uHoHvOMDqa77K86Dpr8',
      id: ProductsEnum.Solo,
      rules: [
        {
          title: '100k words per month',
          limit: true,
        },
        {
          title: 'Up to 3 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 50 Images per month',
          limit: true,
        },
      ],
    },
    {
      index: 3,
      plan: 'Flow',
      description: `Designed for creators who need more room to grow, it offers an expanded set of tools to keep your content flowing and your audience engaged.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 29,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OGs2SHoHvOMDqa7VsM1C83M',
      stripeYearlyPriceId: 'price_1OGs2SHoHvOMDqa7f1HNrVYm',
      popular: true,
      id: ProductsEnum.Flow,
      rules: [
        {
          title: '500k words per month',
          limit: true,
        },
        {
          title: 'Up to 10 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
      ],
    },
    {
      index: 4,
      plan: 'Horizon',
      description: `ultimate tier for serious content professionals who want no limits on their creative output, with premium features that cater to expansive projects and diverse needs.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 99,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 50,
      planAnnualPercentOff: 51,
      stripeMonthlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
      stripeYearlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
      id: ProductsEnum.Horizon,
      rules: [
        {
          title: 'Unlimited words per month',
          limit: true,
        },
        {
          title: 'Up to 25 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
      ],
    },
  ];
} else {
  cardPricing_standard = [
    // {
    //     id: 1,
    //     plan: 'Free',
    //     description: 'Discover the power of Adfluens',
    //     btnText: '',
    //     free: true,
    //     planMonthlyPrice: 0,
    //     planAnnualPercentOff: 1,
    //     planDiscountPercentOff: 1,
    //     rules: [
    //         {
    //             title: '10k words per month',
    //             limit: true,
    //         },
    //         {
    //             title: 'Single Project',
    //             limit: true,
    //         },
    //         {
    //             title: 'Advance Editor',
    //             limit: true,
    //         },
    //         {
    //             title: '25+ languages',
    //             limit: true,
    //         },
    //         {
    //             title: `20+ assistant's tasks`,
    //             limit: true,
    //         },
    //         {
    //             title: `15+ voice tones`,
    //             limit: true,
    //         },
    //         {
    //             title: 'Chat',
    //             limit: false,
    //         },
    //         {
    //             title: 'Create Images',
    //             limit: false,
    //         },
    //     ],
    // },
    {
      index: 2,
      plan: 'Solo',
      description: `Perfect for solo adventurers looking to create impactful content, it provides a robust foundation to start building your presence with essential tools and support.`,
      btnText: 'Upgrade',
      free: false,

      planMonthlyPrice: 15,
      planAnnualPrice: 9.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OGs3uHoHvOMDqa7oTpWkv8R',
      stripeYearlyPriceId: 'price_1OGs3uHoHvOMDqa77K86Dpr8',
      id: ProductsEnum.Solo,
      rules: [
        {
          title: '100k words per month',
          limit: true,
        },
        {
          title: 'Up to 3 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 50 Images per month',
          limit: true,
        },
      ],
    },
    {
      index: 3,
      plan: 'Flow',
      description: `Designed for creators who need more room to grow, it offers an expanded set of tools to keep your content flowing and your audience engaged.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 29,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OGs2SHoHvOMDqa7VsM1C83M',
      stripeYearlyPriceId: 'price_1OGs2SHoHvOMDqa7f1HNrVYm',
      popular: true,
      id: ProductsEnum.Flow,
      rules: [
        {
          title: '500k words per month',
          limit: true,
        },
        {
          title: 'Up to 10 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
      ],
    },
    {
      index: 4,
      plan: 'Horizon',
      description: `ultimate tier for serious content professionals who want no limits on their creative output, with premium features that cater to expansive projects and diverse needs.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 99,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 50,
      planAnnualPercentOff: 51,
      stripeMonthlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
      stripeYearlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
      id: ProductsEnum.Horizon,
      rules: [
        {
          title: 'Unlimited words per month',
          limit: true,
        },
        {
          title: 'Up to 25 Projects',
          limit: true,
        },
        {
          title: 'Advance Editor',
          limit: true,
        },
        {
          title: '25+ languages',
          limit: true,
        },
        {
          title: `20+ assistant's tasks`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: 'Chat',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
        {
          title: 'Create 100 Images per month',
          limit: true,
        },
      ],
    },
  ];
}

export function getPlanDetailsFromStripeProductId(
  stripeProductId: string
): IPriceCardData | undefined {
  const output = cardPricing_standard.find((c) => c.id === stripeProductId);

  if (!output) {
    console.error(
      'The given stripeProductId is not related to any pricing card.'
    );
    return undefined;
  }

  return output;
}

export function getCardPricingStandard(): IPriceCardData[] {
  return cardPricing_standard;
}
