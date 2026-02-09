---
sidebar_position: 2
---

# Утилиты

SimpleUI предоставляет несколько утилит для упрощения работы с библиотекой.

## cn

Функция `cn` объединяет классы с помощью `clsx` и `tailwind-merge` для оптимальной работы с Tailwind CSS.

### Импорт

```tsx
import { cn } from '@simpleui/core';
```

### Использование

```tsx
import { cn } from '@simpleui/core';

function Button({ className, ...props }) {
  return (
    <button className={cn('base-class', className)} {...props}>
      Кнопка
    </button>
  );
}
```

### Примеры

#### Базовое использование

```tsx
cn('px-4', 'py-2', 'bg-blue-500');
// Результат: 'px-4 py-2 bg-blue-500'
```

#### Условные классы

```tsx
cn('px-4', isActive && 'bg-blue-500', isDisabled && 'opacity-50');
// При isActive = true: 'px-4 bg-blue-500'
// При isActive = false: 'px-4'
```

#### Объединение классов

```tsx
cn('px-4 py-2', 'bg-blue-500', 'hover:bg-blue-600');
// Результат: 'px-4 py-2 bg-blue-500 hover:bg-blue-600'
```

#### Разрешение конфликтов Tailwind

```tsx
cn('px-4', 'px-6');
// Результат: 'px-6' (последний класс перезаписывает первый)
```

## Типы

### BaseProps

Базовый интерфейс для компонентов с общими пропсами.

```tsx
import type { BaseProps } from '@simpleui/core';

interface MyComponentProps extends BaseProps {
  // Ваши пропсы
}
```

### Variant

Тип для вариантов компонентов.

```tsx
import type { Variant } from '@simpleui/core';

const variant: Variant = 'primary'; // 'primary' | 'secondary' | 'ghost' | 'danger'
```

### Size

Тип для размеров компонентов.

```tsx
import type { Size } from '@simpleui/core';

const size: Size = 'md'; // 'sm' | 'md' | 'lg'
```

## Следующие шаги

- [ThemeProvider](./theme-provider.md)
