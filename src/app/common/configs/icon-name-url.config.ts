const iconNameUrl_data: IconNameUrl[] = [
    {
        iconName: 'facebook',
        iconUrl: 'https://img.icons8.com/color/48/facebook-new.png'
    },
    {
        iconName: 'linkedin',
        iconUrl: 'https://img.icons8.com/color/48/linkedin.png'
    },
    {
        iconName: 'instagram',
        iconUrl: 'https://img.icons8.com/color/48/000000/instagram-new--v1.png'
    },
    {
        iconName: 'email',
        iconUrl: 'https://img.icons8.com/doodle/48/new-post.png'
    },
    {
        iconName: 'sms',
        iconUrl: 'https://img.icons8.com/color/48/sms.png'
    },
    {
        iconName: 'github',
        iconUrl: 'https://img.icons8.com/material-outlined/24/github.png'
    }
    ,
    {
        iconName: 'code',
        iconUrl: 'https://img.icons8.com/color/48/code.png'
    },
    {
        iconName: 'google',
        iconUrl: 'https://img.icons8.com/color/48/google-logo.png'
    },
    {
        iconName: 'twitter',
        iconUrl: 'https://img.icons8.com/color/48/twitter--v1.png'
    },
    {
        iconName: 'youtube',
        iconUrl: 'https://img.icons8.com/color/48/youtube-play.png'
    },
    {
        iconName: 'hashtag',
        iconUrl: 'https://img.icons8.com/ios/50/hashtag.png'
    },
    {
        iconName: 'letter',
        iconUrl: 'https://img.icons8.com/color/48/secured-letter--v1.png'
    }
];

export interface IconNameUrl {
   
    iconName: string;

    iconUrl: string;
}

export function icons_getUrl(iconName: string): string {
    const index = iconNameUrl_data.findIndex(i => i.iconName === iconName);

    if (index >= 0) {
        return iconNameUrl_data[index].iconUrl;
    }

    return 'https://img.icons8.com/office/30/fantasy.png'
}