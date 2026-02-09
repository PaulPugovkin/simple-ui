---
sidebar_position: 3
---

# Миграция

Это руководство поможет вам мигрировать на SimpleUI из других UI библиотек.

## Миграция с других UI библиотек

### Из Material-UI

```tsx
// Material-UI
<Button variant="contained" color="primary">
  Кнопка
</Button>

// SimpleUI
import { Button } from '@simpleui/core';

<Button variant="primary">Кнопка</Button>
```

### Из Ant Design

```tsx
// Ant Design
<Button type="primary">
  Кнопка
</Button>

// SimpleUI
import { Button } from '@simpleui/core';

<Button variant="primary">Кнопка</Button>
```

### Из Chakra UI

```tsx
// Chakra UI
<Button colorScheme="blue">
  Кнопка
</Button>

// SimpleUI
import { Button } from '@simpleui/core';

<Button variant="primary">Кнопка</Button>
```

### Из shadcn/ui

```tsx
// shadcn/ui
import { Button } from '@/components/ui/button';

<Button>Кнопка</Button>

// SimpleUI
import { Button } из '@simpleui/core';

<Button>Кнопка</Button>
```

## Общие изменения

### Импорты

```tsx
// Было
import { Button } из '@mui/material';
// или
import { Button } из 'antd';
// или
import { Button } из '@chakra-ui/react';

// Стало
import { Button } из '@simpleui/core';
```

### Темы

```tsx
// Было
import { createTheme, ThemeProvider } из '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
});

// Стало
import { ThemeProvider, lightTheme } из '@simpleui/core';

<ThemeProvider theme={lightTheme}>
  {/* Компоненты */}
</ThemeProvider>
```

### Стили

```tsx
// Было
import { makeStyles } из '@mui/material';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#1976d2',
    color: '#ffffff',
  },
});

// Стало
import { Button } из '@simpleui/core';

<Button className="bg-blue-600 text-white">Кнопка</Button>
```

## Пошаговая миграция

### Шаг 1: Установка

Установите SimpleUI:

```bash
npm install @simpleui/core
```

### Шаг 2: Замена импортов

Найдите и замените все импорты:

```tsx
// Найдите все импорты из старой библиотеки
// import { Button } из 'old-library';

// Замените на импорты SimpleUI
import { Button } из '@simpleui/core';
```

### Шаг 3: Обновление компонентов

Обновите использование компонентов:

```tsx
// Было
<Button variant="contained" color="primary" size="large">
  Кнопка
</Button>

// Стало
<Button variant="primary" size="lg">
  Кнопка
</Button>
```

### Шаг 4: Удаление старой библиотеки

Удалите старую библиотеку:

```bash
npm uninstall old-library
```

### Шаг 5: Тестирование

Протестируйте приложение:

```bash
npm run dev
```

## Карта соответствия компонентов

| SimpleUI | Material-UI | Ant Design | Chakra UI | shadcn/ui |
|-----------|-------------|-------------|------------|------------|
| `Button` | `Button` | `Button` | `Button` | `Button` |
| `variant="primary"` | `variant="contained"` | `type="primary"` | `colorScheme="blue"` | — |
| `variant="secondary"` | `variant="outlined"` | `type="default"` | `colorScheme="gray"` | — |
| `variant="ghost"` | `variant="text"` | `type="text"` | `variant="ghost"` | `variant="ghost"` |
| `size="sm"` | `size="small"` | `size="small"` | `size="sm"` | `size="sm"` |
| `size="md"` | `size="medium"` | `size="middle"` | `size="md"` | `size="default"` |
| `size="lg"` | `size="large"` | `size="large"` | `size="lg"` | `size="lg"` |
| `loading` | `loading` | `loading` | `isLoading` | `loading` | `loading` |
| `disabled` | `disabled` | `disabled` | `disabled` | `isDisabled` | `disabled` |

## Известные проблемы

### Tailwind конфликты

Если вы используете Tailwind CSS, убедитесь в конфигурации:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@simpleui/core/**/*.{js,jsx,ts,tsx}', // Добавьте SimpleUI
  ],
}
```

### CSS приоритет

SimpleUI использует специфичность для стилей. Если нужно переопределить, используйте:

```tsx
<Button className="!important-class">Кнопка</Button>
```

## Ресурсы

- [Быстрый старт](../getting-started/quick-start.md)
- [Кастомизация](./customization.md)
- [Доступность](./accessibility.md)
