---
sidebar_position: 1
---

# Установка

## Требования

- Node.js >= 18.0.0
- React >= 18.0.0
- Пакетный менеджер: npm или yarn

## Установка через npm

```bash
npm install @simpleui/core
```

## Установка через yarn

```bash
yarn add @simpleui/core
```

## Подключение стилей

После установки подключите стили библиотеки:

```tsx
import '@simpleui/core/styles';
```

## Проверка установки

Вы можете проверить установку, импортировав компонент:

```tsx
import { Button } from '@simpleui/core';

function App() {
  return <Button>Hello World</Button>;
}
```

## Следующие шаги

- [Быстрый старт](./quick-start.md)
- [Темизация](./theming.md)
