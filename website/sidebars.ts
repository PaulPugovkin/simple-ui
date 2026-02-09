import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Введение',
    },
    {
      type: 'category',
      label: 'Быстрый старт',
      link: { type: 'doc', id: 'getting-started/installation' },
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/theming',
      ],
    },
    {
      type: 'category',
      label: 'Руководства',
      link: { type: 'doc', id: 'guides/accessibility' },
      items: [
        'guides/accessibility',
        'guides/customization',
        'guides/migration',
      ],
    },
    {
      type: 'category',
      label: 'API',
      link: { type: 'doc', id: 'api/theme-provider' },
      items: [
        'api/theme-provider',
        'api/utilities',
      ],
    },
    {
      type: 'doc',
      id: 'changelog',
      label: 'История изменений',
    },
  ],
  componentsSidebar: [
    {
      type: 'category',
      label: 'Atoms',
      items: [
        'components/button',
        'components/input',
        'components/label',
        'components/typography',
      ],
    },
    {
      type: 'category',
      label: 'Molecules',
      items: [
        'components/card',
        'components/form-field',
        'components/dropdown',
      ],
    },
    {
      type: 'category',
      label: 'Organisms',
      items: [
        'components/modal',
        'components/table',
        'components/form',
      ],
    },
  ],
};

export default sidebars;
