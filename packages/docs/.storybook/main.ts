import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../../core/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@simpleui/core': path.resolve(__dirname, '../../core/src'),
        },
      },
      css: {
        postcss: {
          plugins: [
            require('tailwindcss')({ config: './.storybook/tailwind.config.js' }),
            require('autoprefixer'),
          ],
        },
      },
    });
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
