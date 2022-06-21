const custom = require('../webpack.config.js');

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/index.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-docs"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5"
  },
  webpackFinal: async config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.filter(r => !r.test.toString().includes('svg')),
        ...custom.module.rules
      ]
    }
  })
};
