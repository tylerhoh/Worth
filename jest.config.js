module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^gocardless-nodejs$': '<rootDir>/__mocks__/gocardless-nodejs.ts', // Mock the gocardless-nodejs library
    },
};