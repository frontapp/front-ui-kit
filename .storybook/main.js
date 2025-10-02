const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  webpackFinal: async (config) => {
    // Override the webpack rules to use Babel loader for TypeScript files in Storybook
    const babelRule = custom.module.rules.find((rule) => rule.test && rule.test.toString().includes('tsx'));

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter(
            (r) => !r.test || (!r.test.toString().includes('svg') && !r.test.toString().includes('ts'))
          ),
          // Use Babel loader for both .ts and .tsx files in Storybook
          {
            test: /\.ts$/,
            use: babelRule.use
          },
          ...custom.module.rules.filter((rule) => rule.test && rule.test.toString().includes('tsx')),
          ...custom.module.rules.filter(
            (rule) =>
              !rule.test || (!rule.test.toString().includes('ts') && !rule.test.toString().includes('tsx'))
          )
        ]
      }
    };
  }
};
