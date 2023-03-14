/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2021-05-15T12:05:47+02:00
 * @Copyright: Technology Studio
**/

const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json');

const { defaults } = require('jest-config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/__tests__/Tests/**/?(*.)(spec|test).ts',
    '<rootDir>/src/components/**/__tests__/?(*.)(spec|test).(ts|tsx)'
  ],
  transformIgnorePatterns: [
    // '/node_modules/(?!@txo).+\\.js$', // NOTE: add when needed
    'node_modules/(?!(react-native|@react-native\/polyfills)/)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFiles: [
    '<rootDir>/__tests__/Setup.ts',
    '<rootDir>/node_modules/react-native/jest/setup.js'
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
  ],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
    '^.+.tsx?$': ['ts-jest', {
      tsconfig: './tsconfig-spec.json'
    }]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths , { prefix: '<rootDir>/' } ),
}
