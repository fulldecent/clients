const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  stories: [
    "../libs/components/src/**/*.stories.mdx",
    "../libs/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../apps/web/src/**/*.stories.mdx",
    "../apps/web/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../bitwarden_license/bit-web/src/**/*.stories.mdx",
    "../bitwarden_license/bit-web/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  env: (config) => ({
    ...config,
    FLAGS: JSON.stringify({
      secretsManager: true,
    }),
  }),
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
  docs: {
    autodocs: true,
  },
};
