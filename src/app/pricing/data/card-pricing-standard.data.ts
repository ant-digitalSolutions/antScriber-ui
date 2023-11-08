import { IPriceCardData } from "../dto/pricing-card-data.interface";

export const cardPricing_standard: IPriceCardData[] = [
    // {
    //     id: 1,
    //     plan: 'Free',
    //     description: 'Discover the power of Adfluens',
    //     btnText: '',
    //     free: true,
    //     planOriginalPrice: 0,
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
        id: 2,
        plan: 'Solo',
        description: `Perfect for solo adventurers looking to create impactful content, it provides a robust foundation to start building your presence with essential tools and support.`,
        btnText: 'Upgrade',
        free: false,

        planOriginalPrice: 15,
        planDiscountPercentOff: 20,
        planAnnualPercentOff: 40,
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
        id: 3,
        plan: 'Flow',
        description: `Designed for creators who need more room to grow, it offers an expanded set of tools to keep your content flowing and your audience engaged.`,
        btnText: 'Upgrade',
        free: false,
        planOriginalPrice: 49,
        planDiscountPercentOff: 20,
        planAnnualPercentOff: 40,
        popular: true,
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
        id: 4,
        plan: 'Horizon',
        description: `ultimate tier for serious content professionals who want no limits on their creative output, with premium features that cater to expansive projects and diverse needs.`,
        btnText: 'Upgrade',
        free: false,
        planOriginalPrice: 99,
        planDiscountPercentOff: 50,
        planAnnualPercentOff: 51,
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