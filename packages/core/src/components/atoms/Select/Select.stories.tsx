import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
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
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'ru', label: 'Россия' },
  { value: 'kz', label: 'Казахстан' },
  { value: 'by', label: 'Беларусь' },
  { value: 'cn', label: 'Китай' },
  { value: 'us', label: 'США', disabled: true },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите страну...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Страна',
    options: defaultOptions,
    placeholder: 'Выберите страну...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Страна',
    options: defaultOptions,
    error: 'Поле обязательно для заполнения',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Страна',
    variant: 'success',
    value: 'ru',
    options: defaultOptions,
    helperText: 'Страна выбрана успешно',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Страна',
    options: defaultOptions,
    helperText: 'Выберите вашу страну проживания',
  },
};

export const Small: Story = {
  args: {
    label: 'Маленький селект',
    size: 'sm',
    options: defaultOptions,
    placeholder: 'Выберите...',
  },
};

export const Medium: Story = {
  args: {
    label: 'Средний селект',
    size: 'md',
    options: defaultOptions,
    placeholder: 'Выберите...',
  },
};

export const Large: Story = {
  args: {
    label: 'Большой селект',
    size: 'lg',
    options: defaultOptions,
    placeholder: 'Выберите...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Отключенный селект',
    disabled: true,
    value: 'ru',
    options: defaultOptions,
  },
};

export const WithSelectedValue: Story = {
  args: {
    label: 'Страна',
    value: 'kz',
    options: defaultOptions,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    return (
      <Select
        label="Контролируемый селект"
        value={value}
        onChange={(v) => setValue(v)}
        options={defaultOptions}
        placeholder="Выберите страну..."
      />
    );
  },
};

export const EmptyOptions: Story = {
  args: {
    label: 'Пустой список',
    options: [],
    placeholder: 'Нет вариантов...',
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      country: '',
      city: '',
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.country) {
        newErrors.country = 'Страна обязательна';
      }
      if (!formData.city) {
        newErrors.city = 'Город обязателен';
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Форма валидна!');
      }
    };

    const cityOptions = formData.country
      ? [
          { value: 'msk', label: 'Москва' },
          { value: 'spb', label: 'Санкт-Петербург' },
          { value: 'nsk', label: 'Новосибирск' },
        ]
      : [];

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Select
          label="Страна"
          value={formData.country}
          onChange={(v) => setFormData({ ...formData, country: v, city: '' })}
          options={defaultOptions}
          placeholder="Выберите страну..."
          error={errors.country}
          variant={errors.country ? 'error' : 'default'}
        />
        <Select
          label="Город"
          value={formData.city}
          onChange={(v) => setFormData({ ...formData, city: v })}
          options={cityOptions}
          placeholder={
            formData.country ? 'Выберите город...' : 'Сначала выберите страну'
          }
          disabled={!formData.country}
          error={errors.city}
          variant={errors.city ? 'error' : 'default'}
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
