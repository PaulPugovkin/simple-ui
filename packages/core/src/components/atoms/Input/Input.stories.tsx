import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Введите текст...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'example@mail.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    error: 'Пароль должен содержать минимум 8 символов',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Имя пользователя',
    variant: 'success',
    helperText: 'Это имя доступно',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Описание',
    helperText: 'Максимум 200 символов',
  },
};

export const Small: Story = {
  args: {
    label: 'Маленький инпут',
    inputSize: 'sm',
    placeholder: 'Small input',
  },
};

export const Medium: Story = {
  args: {
    label: 'Средний инпут',
    inputSize: 'md',
    placeholder: 'Medium input',
  },
};

export const Large: Story = {
  args: {
    label: 'Большой инпут',
    inputSize: 'lg',
    placeholder: 'Large input',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключенный инпут',
    disabled: true,
    value: 'Значение',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <Input
        label="Контролируемый инпут"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Начните вводить..."
      />
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      name: '',
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.email) {
        newErrors.email = 'Email обязателен';
      } else if (!formData.email.includes('@')) {
        newErrors.email = 'Некорректный email';
      }

      if (!formData.password) {
        newErrors.password = 'Пароль обязателен';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Минимум 8 символов';
      }

      if (!formData.name) {
        newErrors.name = 'Имя обязательно';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Форма валидна!');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          label="Email"
          type="email"
          placeholder="example@mail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          variant={errors.email ? 'error' : 'default'}
        />
        <Input
          label="Пароль"
          type="password"
          placeholder="Минимум 8 символов"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          variant={errors.password ? 'error' : 'default'}
        />
        <Input
          label="Имя"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          variant={errors.name ? 'error' : 'default'}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Отправить
        </button>
      </form>
    );
  },
};
