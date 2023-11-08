import { IPriceCardData } from "../dto/pricing-card-data.interface";

export const cardPricing_standard: IPriceCardData[] = [
    {
        id: 1,
        plan: 'Free',
        description: 'Discover the power of Adfluens',
        btnText: '',
        free: true,
        rules: [
            {
                title: '10k words per month',
                limit: true,
            },
            {
                title: 'Single Project',
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
                limit: false,
            },
            {
                title: 'Create Images',
                limit: false,
            },
        ],
    },
    {
        id: 2,
        plan: 'Spark',
        description: 'Ideal for Freelancers',
        btnText: 'Upgrade',
        free: false,
        popular: true,
        planPrice: 15.99,
        planPercentAmountOff: 20,
        rules: [
            {
                title: '100k words per month',
                limit: true,
            },
            {
                title: 'Up to 5 Projects',
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
        description: `Designed for businesses and agencies that need to create content for multiple projects`,
        btnText: 'Upgrade',
        free: false,
        planPrice: 29.99,
        planPercentAmountOff: 20,
        rules: [
            {
                title: 'Unlimited words per month',
                limit: true,
            },
            {
                title: 'Up to 15 Projects',
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