// jest.config.js
const { defaults } = require('jest-config');
module.exports = {
  // ...
  "moduleFileExtensions": ['tsx', 'ts', ...defaults.moduleFileExtensions],
  "setupFilesAfterEnv": ["src/setupTests.js"]
  // ...
};