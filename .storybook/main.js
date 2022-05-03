const custom = require('../webpack.config.js');

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5"
  },
  webpackFinal: async config => ({...config, module: {...config.module, rules: custom.module.rules}})
};
