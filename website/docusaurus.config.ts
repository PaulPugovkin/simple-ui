import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SimpleUI',
  tagline: 'Modern React UI Library',
  favicon: 'img/favicon.ico',

  url: 'https://simpleui.dev',
  baseUrl: '/',

  organizationName: 'simpleui',
  projectName: 'simpleui',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/simpleui/simpleui/tree/main/website/',
          versions: {
            current: {
              label: 'v1.x',
              path: 'v1',
            },
          },
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'SimpleUI',
      logo: {
        alt: 'SimpleUI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Документация',
        },
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: 'Компоненты',
        },
        { to: '/blog', label: 'Блог', position: 'left' },
        {
          href: 'https://github.com/simpleui/simpleui',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Документация',
          items: [
            { label: 'Быстрый старт', to: '/docs/getting-started/quick-start' },
            { label: 'Компоненты', to: '/docs/components/button' },
          ],
        },
        {
          title: 'Сообщество',
          items: [
            { label: 'Discord', href: 'https://discord.gg/simpleui' },
            { label: 'Twitter', href: 'https://twitter.com/simpleui' },
          ],
        },
        {
          title: 'Ещё',
          items: [
            { label: 'GitHub', href: 'https://github.com/simpleui/simpleui' },
            { label: 'npm', href: 'https://www.npmjs.com/package/@simpleui/core' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SimpleUI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'tsx', 'bash'],
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects: function (existingPath) {
          return [
            { fromPath: '/button', toPath: '/docs/components/button' },
          ];
        },
      },
    ],
  ],
};

export default config;
