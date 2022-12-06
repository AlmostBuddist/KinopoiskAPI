module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
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

    /* airbnb */

    'no-useless-constructor': 'off',
    'import/extensions': [
      'warn',
      {
        ts: 'never',
      },
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: [
          'functions',
          'arrowFunctions',
          'generatorFunctions',
          'methods',
          'generatorMethods',
          'getters',
          'setters',
          'asyncFunctions',
          'asyncMethods',
        ],
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-restricted-globals': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

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
  ],
};
