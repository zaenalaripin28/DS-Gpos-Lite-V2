

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    '../foundations/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/**/*.mdx',
  ],
  staticDirs: [
    { from: '../assets', to: '/assets' },
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/html-vite',
};
export default config;