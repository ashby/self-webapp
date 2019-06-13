const ENV = APP_ENV || 'qa';

const isProd = ENV === 'prod';

// const envPrefix = isProd ? '' : `${ENV}.`;

export const CONFIG = {
    ENV,
    API_URL: 'https://powerful-cove-99642.herokuapp.com',
    AUTH_TOKEN: 'auth-token',
    USER_ID: 'user-id'
};