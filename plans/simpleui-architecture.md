# SimpleUI — Архитектура React UI библиотеки

## Обзор проекта

**SimpleUI** — это современная React UI библиотека с полной поддержкой TypeScript, использующая Tailwind CSS для стилизации и Vite для сборки. Библиотека ориентирована на публикацию в npm и yarn.

---

## Технический стек

| Технология | Назначение |
|------------|------------|
| React 18+ | UI фреймворк |
| TypeScript 5+ | Типизация |
| Tailwind CSS | Стилизация |
| Vite | Система сборки |
| Vitest | Юнит тестирование |
| React Testing Library | Тестирование React компонентов |
| Storybook 8+ | Документация компонентов |
| ESLint + Prettier | Линтинг и форматирование |
| Changesets | Управление версиями и changelog |
| Husky + lint-staged | Git hooks |

---

## Структура директорий

```
simpleui/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI/CD для тестирования
│       └── publish.yml         # Автоматическая публикация в npm
├── packages/
│   ├── core/                   # Основной пакет библиотеки
│   │   ├── src/
│   │   │   ├── components/     # React компоненты
│   │   │   │   ├── atoms/      # Атомарные компоненты (Button, Input, etc.)
│   │   │   │   ├── molecules/  # Молекулярные компоненты (Card, Form, etc.)
│   │   │   │   └── organisms/  # Организмы (Modal, Table, etc.)
│   │   │   ├── theme/          # Система темизации
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   ├── spacing.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/          # Утилиты и хелперы
│   │   │   │   ├── cn.ts       # Classnames утилита (clsx + tailwind-merge)
│   │   │   │   └── types.ts    # Общие типы
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   │   ├── useTheme.ts
│   │   │   │   └── useId.ts
│   │   │   └── index.ts        # Главный экспорт
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   └── vite.config.ts
│   ├── icons/                  # Пакет иконок (опционально)
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   └── docs/                   # Документация (Storybook)
│       ├── .storybook/
│       │   ├── main.ts
│       │   ├── preview.ts
│       │   └── manager.ts
│       ├── stories/
│       │   └── components/
│       └── package.json
├── apps/
│   └── playground/             # Demo приложение для тестирования
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── .changeset/                 # Конфигурация Changesets
│   └── config.json
├── .npmrc                      # Конфигурация npm
├── .yarnrc.yml                 # Конфигурация yarn
├── package.json                # Root package.json (monorepo)
├── tsconfig.base.json          # Базовая конфигурация TypeScript
├── turbo.json                  # Конфигурация Turborepo (опционально)
├── .eslintrc.js                # Конфигурация ESLint
├── .prettierrc                 # Конфигурация Prettier
├── LICENSE                     # Лицензия
└── README.md                   # Документация проекта
```

---

## Архитектура компонентов

### Атомарные компоненты (Atoms)

Простые, неделимые компоненты:

- **Button** — Кнопки с вариантами (primary, secondary, ghost, danger)
- **Input** — Поля ввода с поддержкой валидации
- **Label** — Текстовые метки
- **Badge** — Значки и бейджи
- **Avatar** — Аватары пользователей
- **Icon** — Иконки
- **Typography** — Типографика (H1-H6, p, span)
- **Checkbox** — Чекбоксы
- **Radio** — Радио кнопки
- **Switch** — Переключатели
- **Spinner** — Индикаторы загрузки

### Молекулярные компоненты (Molecules)

Компоненты, состоящие из атомов:

- **Card** — Карточки с контентом
- **FormField** — Обёртка для полей формы с label и error
- **Dropdown** — Выпадающие меню
- **Tabs** — Вкладки
- **Accordion** — Аккордеоны
- **Tooltip** — Всплывающие подсказки
- **Popover** — Поповеры
- **Select** — Выпадающие списки
- **DatePicker** — Выбор даты
- **Slider** — Ползунки

### Организмы (Organisms)

Сложные компоненты:

- **Modal** — Модальные окна
- **Table** — Таблицы с пагинацией и сортировкой
- **Form** — Формы с валидацией
- **Navbar** — Навигационные панели
- **Sidebar** — Боковые панели
- **Pagination** — Пагинация
- **Toast** — Уведомления
- **Drawer** — Выдвижные панели

---

## Система темизации

### Структура тем

```typescript
// packages/core/src/theme/index.ts
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    neutral: {
      50: string;
      100: string;
      // ... до 900
    };
    background: {
      default: string;
      paper: string;
      elevated: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: {
      default: string;
      focus: string;
    };
  };
  typography: {
    fontFamily: {
      sans: string[];
      mono: string[];
    };
    fontSize: Record<string, [string, string]>;
    fontWeight: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  transitions: {
    default: string;
    fast: string;
    slow: string;
  };
}

export const lightTheme: Theme = { /* ... */ };
export const darkTheme: Theme = { /* ... */ };
```

### Provider для тем

```typescript
// packages/core/src/components/ThemeProvider.tsx
interface ThemeProviderProps {
  theme?: Theme | 'light' | 'dark';
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = 'light',
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    typeof theme === 'string' ? (theme === 'dark' ? darkTheme : lightTheme) : theme
  );

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => prev === lightTheme ? darkTheme : lightTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## Система экспорта компонентов

### Tree-shakeable экспорт

```typescript
// packages/core/src/index.ts
// Экспорт компонентов
export { Button } from './components/atoms/Button';
export { Input } from './components/atoms/Input';
export { Card } from './components/molecules/Card';
export { Modal } from './components/organisms/Modal';
// ... остальные компоненты

// Экспорт темы
export { ThemeProvider, useTheme } from './components/ThemeProvider';
export { lightTheme, darkTheme, type Theme } from './theme';

// Экспорт утилит
export { cn } from './utils/cn';
```

### package.json для публикации

```json
{
  "name": "@simpleui/core",
  "version": "0.0.1",
  "description": "SimpleUI — Modern React UI Library",
  "main": "./dist/index.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.es.js",
      "require": "./dist/index.js"
    },
    "./styles": "./dist/style.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "sideEffects": [
    "*.css"
  ],
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## Конфигурация Vite для библиотеки

```typescript
// packages/core/vite.config.ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SimpleUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'es' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
```

---

## Конфигурация Tailwind CSS

```javascript
// packages/core/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // ... остальные цвета
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

---

## Пример компонента

```typescript
// packages/core/src/components/atoms/Button/Button.tsx
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantStyles = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

---

## CI/CD конфигурация

### GitHub Actions для публикации

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: yarn install

      - name: Build packages
        run: yarn build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Управление версиями

Использование **Changesets** для управления версиями:

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@2.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

---

## Тестирование

### Стратегия тестирования

Библиотека использует многоуровневую стратегию тестирования:

1. **Юнит тесты** — тестирование отдельных компонентов и функций
2. **Интеграционные тесты** — тестирование взаимодействия компонентов
3. **Визуальные тесты** — тестирование внешнего вида с Storybook
4. **E2E тесты** — тестирование сценариев использования в playground

### Технический стек для тестирования

| Технология | Назначение |
|------------|------------|
| Vitest | Юнит тестирование |
| React Testing Library | Тестирование React компонентов |
| @testing-library/jest-dom | Дополнительные матчеры для DOM |
| @testing-library/user-event | Симуляция пользовательских действий |
| Storybook Test Runner | Визуальные регрессионные тесты |
| Playwright (в Storybook) | E2E тестирование компонентов |

### Структура тестов

```
packages/core/src/
├── components/
│   └── atoms/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.test.tsx          # Юнит тесты
│           ├── Button.stories.tsx       # Storybook истории
│           └── Button.integration.tsx   # Интеграционные тесты
├── __tests__/
│   ├── utils/
│   │   └── cn.test.ts                   # Тесты утилит
│   └── setup.ts                         # Конфигурация тестов
└── vitest.config.ts                     # Конфигурация Vitest
```

### Конфигурация Vitest

```typescript
// packages/core/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/**/*.stories.tsx',
        'src/**/*.test.tsx',
        'dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Setup файл для тестов

```typescript
// packages/core/src/__tests__/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

### Примеры тестов

#### Юнит тест компонента Button

```typescript
// packages/core/src/components/atoms/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders correctly with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders with default variant', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary-600');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-neutral-100');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-danger-600');

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} loading>Loading</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('has correct ARIA attributes when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('disabled');
    });

    it('can be focused', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe('Loading State', () => {
    it('shows spinner when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toContainHTML('svg');
    });

    it('disables button when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
```

#### Интеграционный тест для Form с Button

```typescript
// packages/core/src/components/molecules/Form/Form.integration.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormField, Button, Input } from '../../..';

describe('Form Integration', () => {
  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <Form onSubmit={handleSubmit}>
        <FormField name="email" label="Email">
          <Input type="email" placeholder="Enter email" />
        </FormField>
        <Button type="submit">Submit</Button>
      </Form>
    );

    await user.type(screen.getByPlaceholderText('Enter email'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'test@example.com' })
      );
    });
  });
});
```

#### Тест утилит

```typescript
// packages/core/src/__tests__/utils/cn.test.ts
import { describe, it, expect } from 'vitest';
import { cn } from '../../utils/cn';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes', () => {
    expect(cn('px-4', false && 'py-2', 'bg-blue-500')).toBe('px-4 bg-blue-500');
  });

  it('handles Tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles undefined and null', () => {
    expect(cn('px-4', undefined, null, 'py-2')).toBe('px-4 py-2');
  });
});
```

### Покрытие кода

Целевые показатели покрытия:

- **Statements:** ≥ 80%
- **Branches:** ≥ 75%
- **Functions:** ≥ 80%
- **Lines:** ≥ 80%

Команды для запуска тестов:

```bash
# Запустить все тесты
yarn test

# Запустить тесты с покрытием
yarn test:coverage

# Запустить тесты в watch режиме
yarn test:watch

# Запустить тесты для конкретного файла
yarn test Button.test.tsx
```

---

## Документация (Storybook)

### Конфигурация Storybook

```typescript
// packages/docs/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
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
```

```typescript
// packages/docs/.storybook/preview.ts
import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
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
};

export default preview;
```

### Пример Story

```typescript
// packages/docs/stories/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@simpleui/core';
import '@simpleui/core/styles';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Вариант кнопки',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер кнопки',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключена ли кнопка',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </>
    ),
  },
};
```

### Визуальные тесты с Storybook Test Runner

```typescript
// packages/docs/.storybook/test-runner.ts
import { type TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async postRender(page, context) {
    const { id, title } = context;

    // Делаем скриншот для каждой истории
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: `./screenshots/${title.replace(/\//g, '-')}-${id}.png`,
    });
  },
};

export default config;
```

### Команды Storybook

```bash
# Запустить Storybook
yarn storybook

# Сборка статического Storybook
yarn build-storybook

# Запустить визуальные тесты
yarn test-storybook

# Запустить E2E тесты в Storybook
yarn test-storybook:e2e
```

---

## Документация и деплой

### Варианты для документации

Для документации UI библиотеки есть несколько популярных решений:

| Решение | Преимущества | Недостатки | Лучше подходит для |
|---------|--------------|------------|-------------------|
| **Storybook** | Интерактивная документация компонентов, встроенная в разработку, визуальные тесты | Не оптимизирован для длинных текстовых руководств | Интерактивная документация компонентов |
| **Docusaurus** | Отличен для текстовой документации, SEO-оптимизирован, интеграция с MDX, темы | Требует отдельной настройки для интерактивных компонентов | Полноценная документация сайта |
| **VitePress** | Быстрый, простой, на базе Vite, Markdown-first | Меньше плагинов чем у Docusaurus | Быстрая документация с примерами |
| **Nextra** | На базе Next.js, MDX, быстрая сборка | Требует Next.js | Если уже используете Next.js |
| **Astro Starlight** | Очень быстрый, отличный DX, тема из коробки | Новое решение, меньше экосистема | Современная документация |
| **GitBook** | Облачный, простой, совместная работа | Платный для команд, меньше кастомизации | Быстрый старт без настройки |

### Рекомендация: Комбинированный подход

Для UI библиотеки **SimpleUI** рекомендую использовать **комбинацию Storybook + Docusaurus**:

- **Storybook** — для интерактивной документации компонентов (встроен в разработку)
- **Docusaurus** — для руководств, API документации, примеров использования, блога

#### Почему Docusaurus?

1. **SEO-оптимизация** — отлично индексируется поисковиками
2. **MDX поддержка** — можно использовать React компоненты в Markdown
3. **Темы и плагины** — богатая экосистема
4. **i18n** — встроенная поддержка многоязычности
5. **Algolia DocSearch** — интеграция поиска из коробки
6. **Версионирование** — поддержка нескольких версий документации
7. **Готовые темы** — можно быстро создать профессиональный сайт

### Структура документации

```
packages/
├── core/                           # Основной пакет
├── docs/                           # Storybook
│   └── .storybook/
├── website/                        # Docusaurus документация
│   ├── docs/
│   │   ├── intro.md                # Введение
│   │   ├── getting-started/        # Быстрый старт
│   │   │   ├── installation.md
│   │   │   ├── quick-start.md
│   │   │   └── theming.md
│   │   ├── components/             # Документация компонентов
│   │   │   ├── button.md
│   │   │   ├── input.md
│   │   │   └── ...
│   │   ├── guides/                 # Руководства
│   │   │   ├── accessibility.md
│   │   │   ├── customization.md
│   │   │   └── migration.md
│   │   ├── api/                    # API документация
│   │   │   ├── theme-provider.md
│   │   │   └── utilities.md
│   │   └── changelog.md            # История изменений
│   ├── blog/                       # Блог (опционально)
│   ├── src/
│   │   ├── components/             # Кастомные компоненты Docusaurus
│   │   │   ├── ComponentExample.tsx
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   └── CodeBlock.tsx
│   │   ├── css/
│   │   │   └── custom.css
│   │   └── theme/
│   │       └── Footer.tsx
│   ├── docusaurus.config.ts
│   ├── sidebars.ts
│   └── package.json
```

### Конфигурация Docusaurus

```typescript
// website/docusaurus.config.ts
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

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
          customCss: './src/css/custom.css',
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
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'simpleui',
      contextualSearch: true,
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
```

### Конфигурация боковой панели

```typescript
// website/sidebars.ts
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
```

### Компонент для интерактивных примеров

```typescript
// website/src/components/ComponentExample.tsx
import React, { useState } from 'react';
import { Button } from '@simpleui/core';
import '@simpleui/core/styles';

export function ComponentExample({ code, children }: { code: string; children: React.ReactNode }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="component-example">
      <div className="component-preview">
        {children}
      </div>
      <div className="component-actions">
        <Button size="sm" onClick={() => setShowCode(!showCode)}>
          {showCode ? 'Скрыть код' : 'Показать код'}
        </Button>
      </div>
      {showCode && (
        <div className="component-code">
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
```

### Пример страницы документации компонента

```markdown
<!-- website/docs/components/button.md ---
import ComponentExample from '@site/src/components/ComponentExample';
import { Button } from '@simpleui/core';
import '@simpleui/core/styles';

# Button

Кнопка — это интерактивный элемент, который позволяет пользователям выполнять действия или переходить на другие страницы.

## Установка

```bash
npm install @simpleui/core
```

## Базовое использование

<ComponentExample code={`<Button>Нажми меня</Button>`}>
  <Button>Нажми меня</Button>
</ComponentExample>

## Варианты

Кнопка поддерживает несколько вариантов оформления:

### Primary

<ComponentExample code={`<Button variant="primary">Primary</Button>`}>
  <Button variant="primary">Primary</Button>
</ComponentExample>

### Secondary

<ComponentExample code={`<Button variant="secondary">Secondary</Button>`}>
  <Button variant="secondary">Secondary</Button>
</ComponentExample>

### Ghost

<ComponentExample code={`<Button variant="ghost">Ghost</Button>`}>
  <Button variant="ghost">Ghost</Button>
</ComponentExample>

### Danger

<ComponentExample code={`<Button variant="danger">Danger</Button>`}>
  <Button variant="danger">Danger</Button>
</ComponentExample>

## Размеры

<ComponentExample code={`<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`}>
  <div className="flex gap-2">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
</ComponentExample>

## Состояние загрузки

<ComponentExample code={`<Button loading>Загрузка...</Button>`}>
  <Button loading>Загрузка...</Button>
</ComponentExample>

## API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Вариант кнопки |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер кнопки |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `disabled` | `boolean` | `false` | Отключена ли кнопка |
| `onClick` | `() => void` | - | Обработчик клика |
| `children` | `ReactNode` | - | Содержимое кнопки |

## Доступность

Кнопка соответствует стандартам WCAG 2.1:
- Поддерживает навигацию с клавиатуры
- Имеет правильные ARIA атрибуты
- Имеет достаточный контраст цветов
```

### Деплой документации

#### GitHub Pages

```yaml
# .github/workflows/deploy-docs.yml
name: Deploy Documentation

on:
  push:
    branches:
      - main
    paths:
      - 'website/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build documentation
        run: yarn build:docs
        working-directory: ./website

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/build
```

#### Vercel

```json
// website/vercel.json
{
  "buildCommand": "yarn build",
  "outputDirectory": "build",
  "installCommand": "yarn install"
}
```

#### Netlify

```toml
# website/netlify.toml
[build]
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Команды для работы с документацией

```json
{
  "scripts": {
    "docs:start": "yarn --cwd website start",
    "docs:build": "yarn --cwd website build",
    "docs:swizzle": "yarn --cwd website swizzle",
    "docs:deploy": "yarn --cwd website deploy",
    "storybook": "yarn --cwd docs storybook",
    "build-storybook": "yarn --cwd docs build-storybook"
  }
}
```

### Интеграция Storybook в Docusaurus

```typescript
// website/src/components/StorybookEmbed.tsx
import React from 'react';

export function StorybookEmbed({ story, height = 500 }: { story: string; height?: number }) {
  return (
    <div className="storybook-embed">
      <iframe
        src={`https://storybook.simpleui.dev/iframe.html?id=${story}&viewMode=story`}
        width="100%"
        height={height}
        frameBorder="0"
        title="Storybook"
      />
    </div>
  );
}
```

---

## Управление версиями

### Стратегия версионирования

Библиотека использует **Changesets** для управления версиями и генерации CHANGELOG. Это позволяет:

- Автоматически управлять версиями пакетов в monorepo
- Генерировать CHANGELOG.md на основе изменений
- Создавать Pull Request для релизов
- Следовать Semantic Versioning (SemVer)

### Конфигурация Changesets

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@2.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### Рабочий процесс с Changesets

#### 1. Создание changeset для изменений

```bash
# Запустить интерактивную команду для создания changeset
yarn changeset

# Пример ответа на вопросы:
# - Which packages would you like to include? @simpleui/core
# - Which packages should have a major bump? (выбор пакета для major версии)
# - What kind of change is this for @simpleui/core? (patch | minor | major)
# - Please enter a summary for this change: Added new Button component with loading state
```

#### 2. Структура changeset файла

```markdown
# .changeset/cool-bears-learn.md

---
"@simpleui/core": minor
---

Added new Button component with loading state and multiple variants.
```

#### 3. Версионирование пакетов

```bash
# Обновить версии пакетов на основе changesets
yarn changeset version

# Эта команда:
# - Обновляет package.json версии пакетов
# - Обновляет внутренние зависимости
# - Генерирует CHANGELOG.md
```

#### 4. Публикация пакетов

```bash
# Опубликовать пакеты в npm
yarn changeset publish

# Эта команда:
# - Публикует пакеты в npm
# - Создаёт GitHub Release с CHANGELOG
# - Удаляет использованные changesets
```

### Semantic Versioning (SemVer)

Библиотека следует SemVer:

- **MAJOR (X.0.0):** Breaking changes, несовместимые с предыдущей версией
- **MINOR (0.X.0):** Новые функции, обратно совместимые
- **PATCH (0.0.X):** Исправления багов, обратно совместимые

### Примеры изменений

#### PATCH (исправление бага)

```markdown
# .changeset/fix-button-focus.md

---
"@simpleui/core": patch
---

Fixed button focus outline not showing in Firefox.
```

#### MINOR (новая функция)

```markdown
# .changeset/add-icon-component.md

---
"@simpleui/core": minor
---

Added new Icon component with support for Lucide icons.
```

#### MAJOR (breaking change)

```markdown
# .changeset/remove-deprecated-props.md

---
"@simpleui/core": major
---

Removed deprecated `primaryColor` prop from Button component.
Use `variant` prop instead.
```

### Автоматизация с GitHub Actions

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Install dependencies
        run: yarn install

      - name: Build packages
        run: yarn build

      - name: Run tests
        run: yarn test

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: yarn release
          version: yarn changeset:version
          commit: 'chore: version packages'
          title: 'chore: version packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### package.json скрипты для версионирования

```json
{
  "scripts": {
    "changeset": "changeset",
    "changeset:version": "changeset version",
    "changeset:publish": "changeset publish",
    "release": "yarn build && yarn changeset:publish"
  }
}
```

### Конфигурация npm

```ini
# .npmrc
registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

### Конфигурация yarn (для работыspaces)

```yaml
# .yarnrc.yml
nodeLinker: node-modules
enableGlobalCache: true
```

### CHANGELOG.md

Changesets автоматически генерирует CHANGELOG.md:

```markdown
# @simpleui/core

## 0.2.0

### Minor Changes

- Added new Button component with loading state and multiple variants
- Added Input component with validation support
- Added Card component for content containers

### Patch Changes

- Fixed button focus outline in Firefox
- Improved TypeScript types for all components

## 0.1.0

### Minor Changes

- Initial release of SimpleUI library
- Added ThemeProvider with light/dark theme support
- Added cn utility for class name merging
```

### Git Hooks с Husky

```bash
# Установка Husky
yarn add -D husky lint-staged
yarn husky install

# Добавление pre-commit hook
yarn husky add .husky/pre-commit "yarn lint-staged"

# Добавление commit-msg hook для Conventional Commits
yarn husky add .husky/commit-msg 'yarn commitlint --edit $1'
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### Теги релизов в Git

После публикации Changesets создаёт Git теги:

```bash
# Пример тегов
@simpleui/core@0.1.0
@simpleui/core@0.2.0
@simpleui/core@1.0.0
```

### Релизный план

#### Alpha/Beta релизы

Для alpha и beta версий используйте префиксы:

```bash
yarn changeset
# Выберите prerelease: alpha | beta
```

#### Stable релизы

Для стабильных релизов:

```bash
yarn changeset version
yarn build
yarn test
yarn changeset publish
```

---

## План реализации

### Этап 1: Базовая инфраструктура
- [ ] Настроить monorepo структуру
- [ ] Настроить TypeScript конфигурацию
- [ ] Настроить Vite для сборки библиотеки
- [ ] Настроить Tailwind CSS
- [ ] Настроить ESLint и Prettier
- [ ] Настроить Husky и lint-staged

### Этап 2: Система темизации
- [ ] Создать типы для темы
- [ ] Реализовать light и dark темы
- [ ] Создать ThemeProvider
- [ ] Создать хук useTheme

### Этап 3: Базовые компоненты
- [ ] Button (с тестами и stories)
- [ ] Input (с тестами и stories)
- [ ] Label (с тестами и stories)
- [ ] Typography (с тестами и stories)

### Этап 4: Расширенные компоненты
- [ ] Card (с тестами и stories)
- [ ] Modal (с тестами и stories)
- [ ] Dropdown (с тестами и stories)
- [ ] Tabs (с тестами и stories)
- [ ] Form (с тестами и stories)
- [ ] Table (с тестами и stories)

### Этап 5: Документация и тестирование
- [ ] Настроить Storybook
- [ ] Настроить Vitest
- [ ] Настроить React Testing Library
- [ ] Написать тесты для всех компонентов
- [ ] Создать документацию в Storybook
- [ ] Настроить визуальные тесты

### Этап 6: Версионирование и публикация
- [ ] Настроить Changesets
- [ ] Настроить CI/CD
- [ ] Настроить автоматическую публикацию
- [ ] Создать README.md
- [ ] Опубликовать первую версию в npm

## План реализации

### Этап 1: Базовая инфраструктура
- [ ] Настроить monorepo структуру
- [ ] Настроить TypeScript конфигурацию
- [ ] Настроить Vite для сборки библиотеки
- [ ] Настроить Tailwind CSS
- [ ] Настроить ESLint и Prettier

### Этап 2: Система темизации
- [ ] Создать типы для темы
- [ ] Реализовать light и dark темы
- [ ] Создать ThemeProvider
- [ ] Создать хук useTheme

### Этап 3: Базовые компоненты
- [ ] Button
- [ ] Input
- [ ] Label
- [ ] Typography

### Этап 4: Расширенные компоненты
- [ ] Card
- [ ] Modal
- [ ] Dropdown
- [ ] Tabs
- [ ] Form
- [ ] Table

### Этап 5: Документация и тестирование
- [ ] Настроить Storybook
- [ ] Настроить Vitest
- [ ] Написать тесты для компонентов
- [ ] Создать документацию

### Этап 6: Публикация
- [ ] Настроить Changesets
- [ ] Настроить CI/CD
- [ ] Опубликовать первую версию в npm
- [ ] Создать README.md

---

## Использование библиотеки

### Установка

```bash
npm install @simpleui/core
# или
yarn add @simpleui/core
```

### Базовое использование

```typescript
import { Button, Input, Card, ThemeProvider } from '@simpleui/core';
import '@simpleui/core/styles';

function App() {
  return (
    <ThemeProvider theme="light">
      <Card>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Динамическая смена темы

```typescript
import { useTheme } from '@simpleui/core';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      Switch to {theme === lightTheme ? 'dark' : 'light'} theme
    </Button>
  );
}
```

---

## Дополнительные возможности

### Tree-shaking
Библиотека полностью поддерживает tree-shaking благодаря модульной структуре экспорта.

### TypeScript
Полная поддержка TypeScript с экспортом типов.

### Доступность (a11y)
Все компоненты соответствуют стандартам WCAG 2.1.

### Кастомизация
Возможность переопределения темы через CSS переменные или пропсы.

---

## Лицензия

MIT License — позволяет свободное использование в коммерческих проектах.
