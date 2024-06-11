import type { Config } from 'jest';

const jestConfig: Config = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // preset: 'ts-jest',
  preset: 'ts-jest/presets/default-esm',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_ENV: 'test',
                    VITE_FAKE_LOGIN: 'true',
                    VITE_DEBUG: 'true',
                    VITE_VERSION: 'test',
                    VITE_PUBLIC_URL: 'http://localhost:3000',
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  testEnvironment: 'jest-environment-jsdom',
};

export default jestConfig;
