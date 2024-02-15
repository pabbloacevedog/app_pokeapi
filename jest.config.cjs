module.exports = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
};
