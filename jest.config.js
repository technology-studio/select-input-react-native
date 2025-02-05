/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-15T12:05:47+02:00
 * @Copyright: Technology Studio
**/

const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./__tests__/tsconfig.json');

const { defaults } = require('jest-config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  testMatch: [
    '<rootDir>/__tests__/Tests/**/?(*.)(spec|test).ts',
    '<rootDir>/src/components/**/__tests__/?(*.)(spec|test).(ts|tsx)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFiles: [
    '<rootDir>/__tests__/Setup.ts',
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    ...['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
}
