import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';
import { determineEnvironment } from 'src/environments/enviroment.dynamic';
import { IPriceCardData } from '../dto/pricing-card-data.interface';

let env = determineEnvironment();

let cardPricing_standard: IPriceCardData[];
if (env === 'local') {
  cardPricing_standard = [
    {
      id: ProductsEnum.FREE,
        index: 1,
        plan: 'Free',
        description: 'A great starting point for exploring Adfluens',
        btnText: '',
        free: true,
        planMonthlyPrice: 0,
        planAnnualPercentOff: 1,
        planDiscountPercentOff: 1,
        planAnnualPrice: -1,
        stripeYearlyPriceId: 'free',
        stripeMonthlyPriceId:'free',
        rules: [
          {
            title: '5k words per month (GPT-3.5)',
            limit: true,
          },
          {
            title: '1 Project',
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
            title: `20+ content templates`,
            limit: true,
          },
          {
            title: `15+ voice tones`,
            limit: true,
          },
          {
            title: `Brand Voice (Coming Soon)`,
            limit: true,
          }
        ],
    },
    {
      index: 2,
      plan: 'Solo',
      description: `Tailored for solo entrepreneurs, bloggers, and content creators focusing on one brand.`,
      btnText: 'Upgrade',
      free: false,
      popular: true,
      planMonthlyPrice: 15,
      planAnnualPrice: 9.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OAcjdFXqwjYWAm8qXUIhbRR',
      stripeYearlyPriceId: 'price_1OAd4JFXqwjYWAm8upr94XbE',
      id: ProductsEnum.Solo,
      rules: [
        {
          title: '100k words per month (GPT-3.5)',
          limit: true,
        },
        {
          title: '1 Project',
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
          title: `20+ content templates`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: `Brand Voice (Coming Soon)`,
          limit: true,
        }
      ],
    },
    {
      index: 3,
      plan: 'Flow',
      description: `Designed for freelancers and small businesses juggling various projects like blogs, social media, and vBlogs.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 29.99,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OAcl7FXqwjYWAm8s5ssMyck',
      stripeYearlyPriceId: 'price_1OAd2lFXqwjYWAm8hjjbbEMs',
      popular: false,
      id: ProductsEnum.Flow,
      rules: [
        {
          title: 'ALL in Solo, plus:',
          limit: true,
        },
        {
          title: 'Unlimited words (GPT-3.5)',
          limit: true,
        },
        {
          title: 'Unblock GPT-4, up to 10k words',
          limit: true,
        },
        {
          title: 'Multiple Projects (Coming Soon)',
          limit: true,
        },
        {
          title: `Multiple Brand Voice (1 per project)`,
          limit: true,
        },
        {
          title: 'Chat Assistant (Coming Soon)',
          limit: true,
        },
        {
          title: '1-Click WordPress Export',
          limit: true,
        }
      ],
    },
    // {
    //   index: 4,
    //   plan: 'Horizon',
    //   description: ` Ideal for larger businesses and enterprises aiming to scale their operations and outreach.`,
    //   btnText: 'Contact Us',
    //   free: false,
    //   planMonthlyPrice: 99,
    //   planAnnualPrice: 90.99,
    //   planDiscountPercentOff: 50,
    //   planAnnualPercentOff: 51,
    //   stripeMonthlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
    //   stripeYearlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
    //   id: ProductsEnum.Horizon,
    //   isEnterprise: true,
    //   rules: [
    //     {
    //       title: 'API Access',
    //       limit: true,
    //     },
    //     {
    //       title: 'Custom content generation templates',
    //       limit: true,
    //     },
    //     {
    //       title: 'Premium Support',
    //       limit: true,
    //     },
    //     {
    //       title: 'Un-Limited Projects',
    //       limit: true,
    //     },
    //     {
    //       title: 'Un-Limited Brand Voices',
    //       limit: true,
    //     },
    
    //   ],
    // },
  ];
} else if (env === 'staging') {
  cardPricing_standard = [
    {
      id: ProductsEnum.FREE,
        index: 1,
        plan: 'Free',
        description: 'A great starting point for exploring Adfluens',
        btnText: '',
        free: true,
        planMonthlyPrice: 0,
        planAnnualPercentOff: 1,
        planDiscountPercentOff: 1,
        planAnnualPrice: -1,
        stripeYearlyPriceId: 'free',
        stripeMonthlyPriceId:'free',
        rules: [
          {
            title: '5k words per month (GPT-3.5)',
            limit: true,
          },
          {
            title: '1 Project',
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
            title: `20+ content templates`,
            limit: true,
          },
          {
            title: `15+ voice tones`,
            limit: true,
          },
          {
            title: `Brand Voice (Coming Soon)`,
            limit: true,
          }
        ],
    },
    {
      index: 2,
      plan: 'Solo',
      description: `Tailored for solo entrepreneurs, bloggers, and content creators focusing on one brand.`,
      btnText: 'Upgrade',
      free: false,
      popular: true,
      planMonthlyPrice: 15,
      planAnnualPrice: 9.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OMbMsHoHvOMDqa7GsVI0y3z',
      stripeYearlyPriceId: 'price_1OMbKyHoHvOMDqa71cWRm7co',
      id: ProductsEnum.Solo,
      rules: [
        {
          title: '100k words per month (GPT-3.5)',
          limit: true,
        },
        {
          title: '1 Project',
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
          title: `20+ content templates`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: `Brand Voice (Coming Soon)`,
          limit: true,
        }
      ],
    },
    {
      index: 3,
      plan: 'Flow',
      description: `Designed for freelancers and small businesses juggling various projects like blogs, social media, and vBlogs.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 29.99,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OMbNsHoHvOMDqa7qN737QeK',
      stripeYearlyPriceId: 'price_1OMbOoHoHvOMDqa7AFjgg5Dz',
      popular: false,
      id: ProductsEnum.Flow,
      rules: [
        {
          title: 'ALL in Solo, plus:',
          limit: true,
        },
        {
          title: 'Unlimited words (GPT-3.5)',
          limit: true,
        },
        {
          title: 'Unblock GPT-4, up to 10k words',
          limit: true,
        },
        {
          title: 'Multiple Projects (Coming Soon)',
          limit: true,
        },
        {
          title: `Multiple Brand Voice (1 per project)`,
          limit: true,
        },
        {
          title: 'Chat Assistant (Coming Soon)',
          limit: true,
        },
        {
          title: '1-Click WordPress Export',
          limit: true,
        }
      ],
    },
  ];
} else {
  cardPricing_standard = [
    {
      id: ProductsEnum.FREE,
        index: 1,
        plan: 'Free',
        description: 'A great starting point for exploring Adfluens',
        btnText: '',
        free: true,
        planMonthlyPrice: 0,
        planAnnualPercentOff: 1,
        planDiscountPercentOff: 1,
        planAnnualPrice: -1,
        stripeYearlyPriceId: 'free',
        stripeMonthlyPriceId:'free',
        rules: [
          {
            title: '5k words per month (GPT-3.5)',
            limit: true,
          },
          {
            title: '1 Project',
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
            title: `20+ content templates`,
            limit: true,
          },
          {
            title: `15+ voice tones`,
            limit: true,
          },
          {
            title: `Brand Voice (Coming Soon)`,
            limit: true,
          }
        ],
    },
    {
      index: 2,
      plan: 'Solo',
      description: `Tailored for solo entrepreneurs, bloggers, and content creators focusing on one brand.`,
      btnText: 'Upgrade',
      free: false,
      popular: true,
      planMonthlyPrice: 15,
      planAnnualPrice: 9.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OMbNKHoHvOMDqa7ENYGvlf0',
      stripeYearlyPriceId: 'price_1OMbNKHoHvOMDqa7jqbuW7lR',
      id: ProductsEnum.Solo,
      rules: [
        {
          title: '100k words per month (GPT-3.5)',
          limit: true,
        },
        {
          title: '1 Project',
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
          title: `20+ content templates`,
          limit: true,
        },
        {
          title: `15+ voice tones`,
          limit: true,
        },
        {
          title: `Brand Voice (Coming Soon)`,
          limit: true,
        }
      ],
    },
    {
      index: 3,
      plan: 'Flow',
      description: `Designed for freelancers and small businesses juggling various projects like blogs, social media, and vBlogs.`,
      btnText: 'Upgrade',
      free: false,
      planMonthlyPrice: 29.99,
      planAnnualPrice: 19.99,
      planDiscountPercentOff: 20,
      planAnnualPercentOff: 40,
      stripeMonthlyPriceId: 'price_1OMbOtHoHvOMDqa7K45eQHNQ',
      stripeYearlyPriceId: 'price_1OMbOtHoHvOMDqa7IUMlEoaT',
      popular: false,
      id: ProductsEnum.Flow,
      rules: [
        {
          title: 'ALL in Solo, plus:',
          limit: true,
        },
        {
          title: 'Unlimited words (GPT-3.5)',
          limit: true,
        },
        {
          title: 'Unblock GPT-4, up to 10k words',
          limit: true,
        },
        {
          title: 'Multiple Projects (Coming Soon)',
          limit: true,
        },
        {
          title: `Multiple Brand Voice (1 per project)`,
          limit: true,
        },
        {
          title: 'Chat Assistant (Coming Soon)',
          limit: true,
        },
        {
          title: '1-Click WordPress Export',
          limit: true,
        }
      ],
    },
    // {
    //   index: 4,
    //   plan: 'Horizon',
    //   description: ` Ideal for larger businesses and enterprises aiming to scale their operations and outreach.`,
    //   btnText: 'Contact Us',
    //   free: false,
    //   planMonthlyPrice: 99,
    //   planAnnualPrice: 90.99,
    //   planDiscountPercentOff: 50,
    //   planAnnualPercentOff: 51,
    //   stripeMonthlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
    //   stripeYearlyPriceId: 'price_1O5JFcFXqwjYWAm81cDrag3G',
    //   id: ProductsEnum.Horizon,
    //   isEnterprise: true,
    //   rules: [
    //     {
    //       title: 'API Access',
    //       limit: true,
    //     },
    //     {
    //       title: 'Custom content generation templates',
    //       limit: true,
    //     },
    //     {
    //       title: 'Premium Support',
    //       limit: true,
    //     },
    //     {
    //       title: 'Un-Limited Projects',
    //       limit: true,
    //     },
    //     {
    //       title: 'Un-Limited Brand Voices',
    //       limit: true,
    //     },
    
    //   ],
    // },
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
