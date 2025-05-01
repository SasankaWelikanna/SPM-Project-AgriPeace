module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/jest'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/jest/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/jest/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest/setupTests.js'
  ],
  setupFiles: ['<rootDir>/jest/setup-jest-environment.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/cypress/'
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  verbose: true,
};