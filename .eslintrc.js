module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'unused-imports', 'simple-import-sort'],
  extends: [
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier'
  ],

  rules: {
    // Affects curly braces in if/else statements.
    curly: [2, 'multi', 'consistent'],
    // Don't require extensions for filenames in import
    'import/extensions': 0,
    // Avoid default exports
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'import/export': 0,
    // This rule seems to trigger an infinite loop and CPU issues in some cases
    'import/order': 0,
    'import/no-unresolved': 0,
    'sort-imports': 0,
    'object-curly-newline': 0,
    'function-paren-newline': 0,
    'react/sort-comp': 0,
    // Incompatible with Prettier.
    'react/jsx-curly-newline': 0,
    'react/jsx-props-no-spreading': 1,
    'react/jsx-curly-brace-presence': [2, {props: 'never', children: 'ignore'}],
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'react/function-component-definition': [2, {namedComponents: 'arrow-function'}],
    'max-classes-per-file': 0,
    'implicit-arrow-linebreak': 0,
    'lines-between-class-members': 0,
    'react/destructuring-assignment': 0,
    quotes: 0,
    'no-multi-str': 0,
    'no-plusplus': 0,
    'max-len': [2, {code: 200}],
    'space-infix-ops': 0,
    'no-return-await': 0,
    'no-continue': 0,
    'no-undef': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    'no-redeclare': 0,
    // Allows the automatic removal of used imports
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 2,

    'storybook/default-exports': 0,

    // Use @ts-expect-error with a comment instead.
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Object: false,
          'JSX.Element': 'Use ReactNode instead'
        }
      }
    ],

    // Correct your types.
    '@typescript-eslint/consistent-type-assertions': ['warn', {assertionStyle: 'never'}],
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['class', 'interface', 'typeAlias'],
        format: ['StrictPascalCase']
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase']
      },
      {
        selector: 'enum',
        format: ['StrictPascalCase'],
        suffix: ['sEnum']
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE']
      },
      {
        selector: 'function',
        format: ['strictCamelCase']
      }
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    // Allow inferrable types for readability.
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-namespace': 'off',
    // Correct your types and/or explicitly check for nullish values.
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/prefer-enum-initializers': 'warn'
  },
  env: {
    browser: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    /*
     * We're disabling some rules on TS(X) files as they're
     * redundant with what the compiler already checks for.
     */
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-use-before-define': 0,
        'no-unused-vars': 0,
        // Allow parameter properties with otherwise empty constructors.
        'no-useless-constructor': 0,
        // Add constructors to the functions that are allowed to be empty.
        'no-empty-function': ['error', {allow: ['arrowFunctions', 'functions', 'methods', 'constructors']}],
        'react/jsx-filename-extension': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/destructuring-assignment': 0,
        'react/prop-types': 0,
        'react/prefer-stateless-function': 0,
        'react/jsx-wrap-multilines': 0,
        'react/no-multi-comp': 0,
        'no-restricted-globals': 0,
        'operator-linebreak': 0,
        'simple-import-sort/imports': 2
      }
    },
    {
      files: [
        '**/__tests__/**/*.js',
        '**/__tests__/**/*.ts',
        '**/__tests__/**/*.tsx',
        '**/__mocks__/**/*.js',
        '**/__mocks__/**/*.ts',
        '**/__mocks__/**/*.tsx',
        '*.spec.js',
        '*.spec.jsx',
        '*.spec.tsx',
        '*.spec.ts'
      ],
      env: {
        jest: true,
        node: true
      },
      globals: {
        window: 'readonly',
        document: 'readonly'
      },
      plugins: ['jest']
    },
    {
      files: ['**.stories.*', '**.preview.*'],
      rules: {
        // Default exports are necessary for CSF stories
        'import/no-default-export': 0,
        // Prop spreading is the canonical way of writing controls
        'react/jsx-props-no-spreading': 0,
        'react/function-component-definition': 0,
        'import/no-extraneous-dependencies': 0
      }
    },
    {
      files: ['**/__tests__/**/*', '*.spec.*', '*.stories.*'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-console': 0
      }
    }
  ]
};
