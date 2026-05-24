import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Select } from './Select';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders correctly with options', () => {
      render(<Select options={defaultOptions} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Выберите...')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select label="Country" options={defaultOptions} />);
      expect(screen.getByText('Country')).toBeInTheDocument();
    });

    it('renders with default variant', () => {
      render(<Select options={defaultOptions} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('border-neutral-300');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Select variant="error" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveClass('border-danger-500');

      rerender(<Select variant="success" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveClass('border-success-500');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Select size="sm" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5');

      rerender(<Select size="md" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2');

      rerender(<Select size="lg" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3');
    });

    it('renders with error message', () => {
      render(<Select error="This field is required" options={defaultOptions} />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Select helperText="Select your country" options={defaultOptions} />);
      expect(screen.getByText('Select your country')).toBeInTheDocument();
    });

    it('renders error message instead of helper text when both are provided', () => {
      render(
        <Select
          error="This field is required"
          helperText="Select your country"
          options={defaultOptions}
        />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.queryByText('Select your country')).not.toBeInTheDocument();
    });

    it('shows placeholder when no value selected', () => {
      render(<Select placeholder="Pick one" options={defaultOptions} />);
      expect(screen.getByText('Pick one')).toBeInTheDocument();
    });

    it('shows "нет доступных вариантов" when options array is empty', async () => {
      const user = userEvent.setup();
      render(<Select options={[]} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Нет доступных вариантов')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('closes dropdown on second click', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(trigger);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('selects option on click', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 2'));

      expect(screen.getByRole('button')).toHaveTextContent('Option 2');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('calls onChange when option is selected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Select options={defaultOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith('option1');
    });

    it('closes dropdown on click outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={defaultOptions} />
          <div data-testid="outside">Outside</div>
        </div>
      );

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(screen.getByTestId('outside'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('does not open dropdown when disabled', async () => {
      const user = userEvent.setup();
      render(<Select disabled options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('cannot select disabled option', async () => {
      const user = userEvent.setup();
      const options = [
        { value: 'opt1', label: 'Enabled' },
        { value: 'opt2', label: 'Disabled', disabled: true },
      ];
      const handleChange = jest.fn();

      render(<Select options={options} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Disabled'));

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation', () => {
    it('opens dropdown on Enter', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown on ArrowDown', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes dropdown on Escape', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{Enter}');
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('selects option with Enter', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Select options={defaultOptions} onChange={handleChange} />);

      const trigger = screen.getByRole('button');
      trigger.focus();
      await user.keyboard('{Enter}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Controlled mode', () => {
    it('renders with controlled value', () => {
      render(<Select value="option2" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveTextContent('Option 2');
    });

    it('updates when controlled value changes', () => {
      const { rerender } = render(<Select value="option1" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveTextContent('Option 1');

      rerender(<Select value="option3" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveTextContent('Option 3');
    });
  });

  describe('Uncontrolled mode', () => {
    it('renders with default value', () => {
      render(<Select defaultValue="option3" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveTextContent('Option 3');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes on trigger', () => {
      render(<Select label="Test" options={defaultOptions} />);
      const trigger = screen.getByRole('button');

      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('has aria-expanded=true when open', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-invalid when error variant', () => {
      render(<Select variant="error" error="Error" options={defaultOptions} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true');
    });

    it('has listbox role when open', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('options have option role', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);
    });

    it('associates label with trigger using htmlFor', () => {
      render(<Select label="Country" options={defaultOptions} />);
      const label = screen.getByText('Country');
      const trigger = screen.getByRole('button');
      expect(label).toHaveAttribute('for');
      expect(trigger).toHaveAttribute('id');
    });

    it('associates error message with trigger using aria-describedby', () => {
      render(<Select error="Error message" options={defaultOptions} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-describedby');
    });

    it('associates helper text with trigger using aria-describedby', () => {
      render(<Select helperText="Helper text" options={defaultOptions} />);
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-describedby');
    });

    it('can be focused', () => {
      render(<Select options={defaultOptions} />);
      const trigger = screen.getByRole('button');
      trigger.focus();
      expect(trigger).toHaveFocus();
    });
  });

  describe('Form integration', () => {
    it('renders hidden input with name', () => {
      render(<Select name="country" value="option1" options={defaultOptions} />);
      const hiddenInput = document.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute('name', 'country');
      expect(hiddenInput).toHaveValue('option1');
    });

    it('does not render hidden input without name', () => {
      render(<Select value="option1" options={defaultOptions} />);
      expect(document.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
    });
  });
});
