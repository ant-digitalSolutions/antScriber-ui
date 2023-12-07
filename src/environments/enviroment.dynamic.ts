const defaultServerDomain = 'https://brain.adfluens.io';
const defaultApiURL = 'https://brain.adfluens.io/api/';

export function getBaseServerDomain() {
  const env = determineEnvironment();
    switch (env) {
        case 'local':
            return 'http://localhost:3000';
        case 'staging':
            return 'https://devbrain.adfluens.io';
        default:
            return defaultServerDomain;
    }
}

export function determineEnvironment(): 'local' | 'staging' | 'production' {
  if (window.location.href.indexOf('ngrok') > 0) {
    return 'local';
  }
    switch (window.location.host) {
      case 'localhost:4200':
        return 'local';
      case 'dev.adfluens.io':
        return 'staging';
      default:
        return 'production';
    }
  }

  export function determinePublishableKey(): string {
    let env = determineEnvironment();
    switch (env) {
      case 'local':
        return 'pk_test_51MdfuXFXqwjYWAm8OYTaPXU4Y04Cg5WYUxGNciIDXX1yC8WzFk1uV49D1yHIcJE8BwCZlCSDkaHt3plpEzMfbNzo00o6k2JINi';
      case 'staging':
        return 'pk_test_51OGm1FHoHvOMDqa7sZQuKq137svuk6uAT5fW6AhILaKvRAbOA8zhIVLLSEsHyhdjPKfDpW7RLxNkMipJgUWc1OPm00xmtURYVf';
      default:
        return 'pk_test_51OGm1FHoHvOMDqa7sZQuKq137svuk6uAT5fW6AhILaKvRAbOA8zhIVLLSEsHyhdjPKfDpW7RLxNkMipJgUWc1OPm00xmtURYVf';
    }
  }

function determineApiUrl(): string {
    return getBaseServerDomain() + '/api/'
}

export function getBaseApiURL(): string {
  if (localStorage.getItem('apiUrl')) {
    return localStorage.getItem('apiUrl') || defaultApiURL;
  }
  localStorage.setItem('apiUrl', determineApiUrl());
  return determineApiUrl();
}


