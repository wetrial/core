const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    ...strictEslint.rules,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/class-name-casing': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'space-infix-ops': 0,
    'eslint-comments/no-unlimited-disable': 0,
    'space-infix-ops': 0,
    'no-useless-return': 0,
    'comma-spacing': 0,
    'import/no-extraneous-dependencies': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'object-curly-spacing': 0,
    'no-plusplus': 0,
    'no-else-return': 0,
    'arrow-body-style': 0,
    'eol-last': 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: ['@config/', '@/'],
      },
    ],
    'key-spacing': 0,
    'space-before-blocks': 0,
    semi: 0,
    'keyword-spacing': 0,
    'arrow-spacing': 0,
    'brace-style': 0,
    'space-before-function-paren': 0,
    'import/order': 0,
    'padded-blocks': 0,
    'react/prefer-stateless-function': 0,
    'lines-between-class-members': 0,
    'consistent-return': 0,
    'import/first': 0,
    'react/jsx-no-bind': 0,
    'no-template-curly-in-string': 0,
    'max-len': ['warn', { code: 400 }],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'class-methods-use-this': 0, //  ["error", { "exceptMethods": ["setDefaultFilter"] }]
    'react/sort-comp': [
      1,
      {
        order: [
          'static-properties',
          'static-methods',
          'type-annotations',
          'propTypes',
          'conventional-private-properties',
          'properties',
          'state',
          'columns',
          'private-instance-fields',
          'lifecycle',
          '/^on.+$/',
          '/^handle.+$/',
          '/^get.+$/',
          'everything-else',
          'render',
        ],
      },
    ],
    'no-bitwise': 0,
    radix: 0,
    'no-useless-computed-key': 0,
    'dot-notation': 0,
    'no-return-await': 0,
  },
  globals: {
    page: true,
  },
};
