import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Input } from './Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders correctly without label', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with default variant', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-neutral-300');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Input variant="error" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-danger-500');

      rerender(<Input variant="success" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-success-500');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(<Input inputSize="sm" />);
      expect(screen.getByRole('textbox')).toHaveClass('px-3', 'py-1.5');

      rerender(<Input inputSize="md" />);
      expect(screen.getByRole('textbox')).toHaveClass('px-4', 'py-2');

      rerender(<Input inputSize="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('px-6', 'py-3');
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter your email" />);
      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="We'll never share your email" />);
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });

    it('renders error message instead of helper text when both are provided', () => {
      render(
        <Input
          error="This field is required"
          helperText="We'll never share your email"
        />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.queryByText("We'll never share your email")).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when value changes', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('does not allow input when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Input onChange={handleChange} disabled />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(input).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes when disabled', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('has correct ARIA attributes when error variant', () => {
      render(<Input variant="error" error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates label with input using htmlFor', () => {
      render(<Input label="Email" />);
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');
      expect(label).toHaveAttribute('for');
      expect(input).toHaveAttribute('id');
    });

    it('associates error message with input using aria-describedby', () => {
      render(<Input error="Error message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('associates helper text with input using aria-describedby', () => {
      render(<Input helperText="Helper text" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby');
    });

    it('can be focused', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe('Value Handling', () => {
    it('renders with default value', () => {
      render(<Input defaultValue="test" />);
      expect(screen.getByRole('textbox')).toHaveValue('test');
    });

    it('renders with controlled value', () => {
      render(<Input value="controlled" readOnly />);
      expect(screen.getByRole('textbox')).toHaveValue('controlled');
    });

    it('updates value when controlled', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('initial');
        return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
      };

      render(<TestComponent />);

      const input = screen.getByRole('textbox');
      await user.type(input, ' updated');

      expect(input).toHaveValue('initial updated');
    });
  });
});
