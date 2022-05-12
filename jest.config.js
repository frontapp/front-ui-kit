/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest'
  },
  globals: {
    "ts-jest": {
      tsconfig: '<rootDir>/tsconfig.json',
      babelConfig: true
    }
  },
  moduleDirectories: [
    'node_modules'
  ],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svg.ts'
  }
};
