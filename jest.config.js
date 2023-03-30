// eslint-disable-next-line no-undef
module.exports = {
  roots: ['<rootDir>/src/__tests__'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testRegex: '.*.(test|spec).(ts)?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/contexts/shared/utils/**/*.ts']
};
