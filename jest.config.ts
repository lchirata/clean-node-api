

export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  // clearMocks: true,
  // collectCoverage: true,
  coverageDirectory: "coverage",
  // coverageProvider: "v8",
  testEnvironment: 'node',
  transform: {
    '.+\\.ts': 'ts-jest'
  }
};
