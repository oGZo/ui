// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    env: {
      browser: true
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: ['html'],
    // check if imports actually resolve
    settings: {
      'import/resolver': {
        webpack: {
          config: 'build/webpack.base.conf.js'
        }
      }
    },
    globals: {
      KKL: true,
      CONFIG: true,
      window: true,
      PAGE_LIST: true,
      ENV_CONFIG: true,
      $: false,
    },
    // add your custom rules here
    rules: {
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      indent: 0,
      'import/no-duplicates': 0,
      'import/no-named-as-default': 0,
      'import/no-named-as-default-member': 0,
      'linebreak-style': 0,
      'no-new': 0,
      'one-var': 0,
      'max-len': 0,
      'no-console': 0,
      'func-names': 0,
      'brace-style': 0,
      'key-spacing': 0,
      'arrow-parens': 0,
      'comma-dangle': 0,
      'prefer-const': 0,
      'padded-blocks': 0,
      'comma-spacing': 0,
      'space-infix-ops': 0,
      'no-multi-spaces': 0,
      'keyword-spacing': 0,
      'object-shorthand': 0,
      'consistent-return': 0,
      'import/extensions': 0,
      'no-mixed-operators': 0,
      'space-before-blocks': 0,
      'no-restricted-syntax': 0,
      'object-curly-spacing': 0,
      'no-underscore-dangle': 0,
      'import/no-unresolved': 0,
      'space-before-function-paren': 0,
      'import/prefer-default-export': 0,
      'import/no-extraneous-dependencies': 0,
      'new-cap': ['error', { properties: false }],
      'no-param-reassign': ['error', { props: false }],
      'no-unused-expressions': [2, { allowShortCircuit: true }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }]
    }
  };
