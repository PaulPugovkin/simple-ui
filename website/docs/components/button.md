---
sidebar_position: 1
---

# Button

Кнопка — это интерактивный элемент, который позволяет пользователям выполнять действия или переходить на другие страницы.

## Установка

```bash
npm install @simpleui/core
```

## Импорт

```tsx
import { Button } from '@simpleui/core';
```

## Базовое использование

```tsx
<Button>Нажми меня</Button>
```

## Варианты

Кнопка поддерживает несколько вариантов оформления:

### Primary

```tsx
<Button variant="primary">Primary</Button>
```

### Secondary

```tsx
<Button variant="secondary">Secondary</Button>
```

### Ghost

```tsx
<Button variant="ghost">Ghost</Button>
```

### Danger

```tsx
<Button variant="danger">Danger</Button>
```

## Размеры

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Состояние загрузки

```tsx
<Button loading>Загрузка...</Button>
```

## Отключённая кнопка

```tsx
<Button disabled>Отключено</Button>
```

## API

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Вариант кнопки |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер кнопки |
| `loading` | `boolean` | `false` | Состояние загрузки |
| `disabled` | `boolean` | `false` | Отключена ли кнопка |
| `onClick` | `() => void` | - | Обработчик клика |
| `children` | `ReactNode` | - | Содержимое кнопки |
| `className` | `string` | - | Дополнительные CSS классы |

## Доступность

Кнопка соответствует стандартам WCAG 2.1:
- Поддерживает навигацию с клавиатуры
- Имеет правильные ARIA атрибуты
- Имеет достаточный контраст цветов
