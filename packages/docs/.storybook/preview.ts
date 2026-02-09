import type { Preview } from '@storybook/react';
import React from 'react';
import { useEffect } from 'react';
import { ThemeProvider } from '../../core/src/components/ThemeProvider';
import '../../core/src/styles/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      
      useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        
        if (theme === 'dark') {
          root.classList.add('dark');
          root.setAttribute('data-theme', 'dark');
          body.style.backgroundColor = '#0a0a0a';
          body.style.color = '#fafafa';
        } else {
          root.classList.remove('dark');
          root.setAttribute('data-theme', 'light');
          body.style.backgroundColor = '#ffffff';
          body.style.color = '#171717';
        }
      }, [theme]);
      
      return React.createElement(
        ThemeProvider,
        { theme: theme as 'light' | 'dark', children: React.createElement(Story) }
      );
    },
  ],
};

export default preview;

