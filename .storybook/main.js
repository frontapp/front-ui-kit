const custom = require('../webpack.config.js');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/index.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'none'
  },
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.filter((r) => !r.test || !r.test.toString().includes('svg')),
        ...custom.module.rules
      ]
    }
  })
};
