import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
// import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
// import typeScriptParser from '@typescript-eslint/parser';

export default [
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ...eslint.configs.recommended,
    ignores: ['**/*.test.*', '**/*.spec.*'],
    files: ['**/*.ts*', '**/*.js*'],
    languageOptions: {
      ecmaVersion: 2022,
      parser: tsEslint.parser,
      sourceType: 'module',
    },
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
