---
sidebar_position: 2
---

# Быстрый старт

## Базовое использование

```tsx
import { Button, ThemeProvider } from '@simpleui/core';
import '@simpleui/core/styles';

function App() {
  return (
    <ThemeProvider theme="light">
      <Button variant="primary">Нажми меня</Button>
    </ThemeProvider>
  );
}
```

## Компоненты

### Button

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Размеры кнопок

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Состояния кнопок

```tsx
<Button loading>Загрузка...</Button>
<Button disabled>Отключено</Button>
```

## Темизация

SimpleUI поддерживает светую и тёмную темы:

```tsx
import { ThemeProvider, useTheme } from '@simpleui/core';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={toggleTheme}>
        Переключить на {theme === lightTheme ? 'тёмную' : 'светую'} тему
      </Button>
    </ThemeProvider>
  );
}
```

## Следующие шаги

- [Установка](./installation.md)
- [Темизация](./theming.md)
- [Компоненты](../components/button.md)
