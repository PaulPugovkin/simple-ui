---
sidebar_position: 2
---

# Кастомизация

SimpleUI предоставляет гибкие возможности для кастомизации компонентов и тем.

## Кастомизация темы

### Переопределение цветов

Вы можете переопределить любые цвета в теме:

```tsx
import { ThemeProvider, lightTheme, type Theme } from '@simpleui/core';

const customTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      ...lightTheme.colors.primary,
      500: '#ff6b6b', // Кастомный основной цвет
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Компоненты */}
    </ThemeProvider>
  );
}
```

### Переопределение типографики

```tsx
const customTheme: Theme = {
  ...lightTheme,
  typography: {
    ...lightTheme.typography,
    fontFamily: {
      sans: ['Custom Font', 'sans-serif'],
      mono: ['Custom Mono', 'monospace'],
    },
  },
};
```

### Переопределение отступов

```tsx
const customTheme: Theme = {
  ...lightTheme,
  spacing: {
    ...lightTheme.spacing,
    sm: '0.75rem', // Кастомный отступ
  },
};
```

## Кастомизация компонентов

### Использование className

Все компоненты поддерживают проп `className` для добавления кастомных стилей:

```tsx
import { Button } from '@simpleui/core';

<Button className="my-custom-class">Кастомная кнопка</Button>
```

### Использование Tailwind утилит

Вы можете использовать любые Tailwind классы:

```tsx
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Градиентная кнопка
</Button>
```

## Расширенная кастомизация

### Создание кастомных компонентов

Вы можете создавать свои компоненты на базе SimpleUI:

```tsx
import { Button, cn } from '@simpleui/core';

interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function CustomButton({ variant = 'primary', children }: CustomButtonProps) {
  return (
    <Button
      className={cn(
        'border-2 border-dashed',
        variant === 'primary' && 'border-primary-500',
        variant === 'secondary' && 'border-secondary-500'
      )}
      variant={variant}
    >
      {children}
    </Button>
  );
}
```

### Композиция компонентов

Компоненты SimpleUI легко композируются:

```tsx
import { Button, ThemeProvider } from '@simpleui/core';

function MyComponent() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Действие 1</Button>
      <Button variant="secondary">Действие 2</Button>
    </div>
  );
}
```

## CSS переменные

SimpleUI использует CSS переменные для темизации. Вы можете переопределить их:

```css
:root {
  --color-primary-500: #ff6b6b;
  --color-secondary-500: #8b5cf6;
  --font-family-sans: 'Custom Font', sans-serif;
}
```

## Рекомендации

1. **Используйте Tailwind** — для большинства кастомизаций достаточно Tailwind
2. **Не модифицируйте напрямую** — используйте пропсы и темы
3. **Следуйте принципам** — сохраняйте согласованность дизайна
4. **Тестируйте** — проверяйте кастомизацию на разных темах

## Примеры

### Полностью кастомная тема

```tsx
import { ThemeProvider, lightTheme, type Theme } from '@simpleui/core';

const brandTheme: Theme = {
  colors: {
    primary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    },
    // ... остальные цвета
  },
  // ... остальные настройки
};

function App() {
  return (
    <ThemeProvider theme={brandTheme}>
      {/* Компоненты */}
    </ThemeProvider>
  );
}
```

### Кастомный компонент

```tsx
import { Button, cn } from '@simpleui/core';

function GradientButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      className={cn(
        'bg-gradient-to-r from-purple-500 to-pink-500',
        'hover:from-purple-600 hover:to-pink-600',
        'transition-all duration-300'
      )}
      variant="primary"
    >
      {children}
    </Button>
  );
}
```

## Следующие шаги

- [Доступность](./accessibility.md)
- [Миграция](./migration.md)
