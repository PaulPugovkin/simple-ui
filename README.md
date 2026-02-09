# SimpleUI

> Modern React UI Library with TypeScript, Tailwind CSS, and full theme support

## 🚀 Quick Start

```bash
# Install the library
yarn add @simpleui/core
```

## 📦 Installation

```bash
yarn add @simpleui/core
```

## 🎨 Usage

```tsx
import { Button, Card, ThemeProvider } from '@simpleui/core';
import '@simpleui/core/styles';

function App() {
  return (
    <ThemeProvider theme="light">
      <Card>
        <Button variant="primary">Click me</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## 🌓 Theming

SimpleUI supports light and dark themes out of the box:

```tsx
import { ThemeProvider, useTheme } from '@simpleui/core';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </ThemeProvider>
  );
}
```

## 📚 Documentation

Full documentation is available at [https://simpleui.dev](https://simpleui.dev)

## 🧪 Components

- **Atoms**: Button, Input, Label, Badge, Avatar, Icon, Typography, Checkbox, Radio, Switch, Spinner
- **Molecules**: Card, FormField, Dropdown, Tabs, Accordion, Tooltip, Popover, Select, DatePicker, Slider
- **Organisms**: Modal, Table, Form, Navbar, Sidebar, Pagination, Toast, Drawer

## 🛠️ Development

> **Note**: This project uses Yarn workspaces. Make sure you have Yarn installed before proceeding.

```bash
# Install Yarn (if not already installed)
npm install -g yarn

# Install dependencies
yarn install

# Start development
yarn dev

# Build packages
yarn build

# Run tests
yarn test

# Run Storybook
yarn storybook

# Build documentation
yarn docs:build
```

## 📝 License

MIT © [SimpleUI](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## 📦 Packages

- `@simpleui/core` - Main UI components library
- `@simpleui/icons` - Icon components (coming soon)

## 🔗 Links

- [Documentation](https://simpleui.dev)
- [GitHub](https://github.com/simpleui/simpleui)
- [npm](https://www.npmjs.com/package/@simpleui/core)
- [Storybook](https://storybook.simpleui.dev)
