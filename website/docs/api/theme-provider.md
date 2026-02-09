---
sidebar_position: 1
---

# ThemeProvider

ThemeProvider предоставляет контекст для управления темой в приложении.

## Импорт

```tsx
import { ThemeProvider, useTheme } from '@simpleui/core';
```

## Использование

### Базовое использование

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

### Использование хука useTheme

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

## API

### ThemeProvider Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `theme` | `Theme \| 'light' \| 'dark'` | `'light'` | Тема или объект темы |
| `children` | `ReactNode` | - | Дочерние элементы |

### useTheme Return Value

| Свойство | Тип | Описание |
|----------|-----|----------|
| `theme` | `Theme` | Текущая тема |
| `toggleTheme` | `() => void` | Функция для переключения темы |
| `setTheme` | `(theme: Theme) => void` | Функция для установки темы |
| `isDark` | `boolean` | Является ли тема тёмной |

## Примеры

### Динамическая смена темы

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

### Кастомная тема

```tsx
import { ThemeProvider, type Theme, lightTheme } from '@simpleui/core';

const customTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: {
      ...lightTheme.colors.primary,
      500: '#ff6b6b', // Кастомный цвет
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Ваши компоненты */}
    </ThemeProvider>
  );
}
```

## Следующие шаги

- [Утилиты](./utilities.md)
