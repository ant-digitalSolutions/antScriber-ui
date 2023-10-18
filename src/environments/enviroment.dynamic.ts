const defaultApiURL = 'https://brain.adfluens.io/api/';

function determineApiUrl(): string {
    switch (window.location.host) {
        case 'localhost:4200':
            return 'http://localhost:3000/api/';
        case 'dev.adfluens.io':
            return 'https://devbrain.adfluens.io/api/';
        default:
            return defaultApiURL;
    }
}

export function getBaseApiURL(): string {
    if (localStorage.getItem('apiUrl')) {
        return (localStorage.getItem('apiUrl') || defaultApiURL);
    }
    const apiURL = determineApiUrl();
    localStorage.setItem('apiUrl', apiURL);
    return apiURL;
}
