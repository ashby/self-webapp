module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleNameMapper: {
        '\\.(scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/asset.stub.js',
        '^components/(.*)': '<rootDir>/src/components/$1',
        '^types/(.*)': '<rootDir>/src/types/$1',
        '^queries/(.*)': '<rootDir>/src/queries/$1',
    },
    "moduleFileExtensions": [ "ts", "tsx", "js", "jsx", "d.ts" ],
    "globals": {
        API_URL: '',
        APP_ENV: '',
        COMPANY_CODE: '',
    },
};
