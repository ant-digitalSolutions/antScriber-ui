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
        description: 'Ideal for Freelancers',
        btnText: 'Upgrade',
        free: false,

        planOriginalPrice: 15,
        planDiscountPercentOff: 20,
        planAnnualPercentOff: 20,
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
        description: `For businesses with multiple clients`,
        btnText: 'Upgrade',
        free: false,
        planOriginalPrice: 29,
        planDiscountPercentOff: 20,
        planAnnualPercentOff: 33,
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
        id: 3,
        plan: 'Horizon',
        description: `For businesses with multiple clients`,
        btnText: 'Upgrade',
        free: false,
        planOriginalPrice: 119,
        planDiscountPercentOff: 50,
        planAnnualPercentOff: 50,
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
        ],
    },
];