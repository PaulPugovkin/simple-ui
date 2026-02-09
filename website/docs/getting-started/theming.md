---
sidebar_position: 3
---

# Темизация

SimpleUI предоставляет гибкую систему темизации с поддержкой светую и тёмной тем.

## Использование ThemeProvider

```tsx
import { ThemeProvider } from '@simpleui/core';

function App() {
  return (
    <ThemeProvider theme="light">
      {/* Ваши компоненты */}
    </ThemeProvider>
  );
}
```

## Использование хука useTheme

```tsx
import { useTheme } from '@simpleui/core';

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Переключить на {isDark ? 'светую' : 'тёмную'} тему
    </button>
  );
}
```

## Кастомная тема

Вы можете создать свою тему, передав объект темы:

```tsx
import { ThemeProvider, type Theme } from '@simpleui/core';

const customTheme: Theme = {
  colors: {
    primary: {
      50: '#e0f2fe',
      // ... остальные цвета
    },
    // ... остальные цвета
  },
  // ... остальные настройки
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Ваши компоненты */}
    </ThemeProvider>
  );
}
```

## Предустановленные темы

SimpleUI предоставляет две предустановленные темы:

### Light Theme

```tsx
import { lightTheme } from '@simpleui/core';

<ThemeProvider theme={lightTheme}>
  {/* Ваши компоненты */}
</ThemeProvider>
```

### Dark Theme

```tsx
import { darkTheme } from '@simpleui/core';

<ThemeProvider theme={darkTheme}>
  {/* Ваши компоненты */}
</ThemeProvider>
```

## Динамическая смена темы

```tsx
import { ThemeProvider, useTheme } from '@simpleui/core';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <button onClick={toggleTheme}>
        Переключить тему
      </button>
    </ThemeProvider>
  );
}
```

## Следующие шаги

- [Установка](./installation.md)
- [Быстрый старт](./quick-start.md)
