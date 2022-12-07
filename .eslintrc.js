module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['jest'],
  extends: ['@a2seven/eslint-config'],
  root: true,
  env: {
    node: true,
    jest: true,
    'jest/globals': true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    /* base */

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',

    'no-console': 'warn',
    'no-restricted-globals': 'off',

    /* prettier */

    'prettier/prettier': [
      'error',
      { useTabs: false, tabWidth: 2, singleQuote: false, trailingComma: 'all' },
    ],

    /* jest */

    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
  overrides: [
    {
      files: ['src/types/*.*', '**/*.dto.ts'],
      rules: { 'max-classes-per-file': 'off' },
    },
    {
      files: ['src/**/*.spec.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
