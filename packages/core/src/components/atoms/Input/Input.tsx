import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import type { Size } from '../../../utils/types';

export type InputVariant = 'default' | 'error' | 'success';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  inputSize?: Size;
  label?: string;
  error?: string;
  helperText?: string;
}

const variantStyles: Record<InputVariant, string> = {
  default:
    'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 text-text-primary dark:border-neutral-600 dark:focus:border-primary-400 dark:focus:ring-primary-400',
  error: 'border-danger-500 focus:border-danger-500 focus:ring-danger-500 text-text-primary dark:border-danger-400 dark:focus:border-danger-400 dark:focus:ring-danger-400',
  success:
    'border-success-500 focus:border-success-500 focus:ring-success-500 text-text-primary dark:border-success-400 dark:focus:border-success-400 dark:focus:ring-success-400',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      inputSize = 'md',
      label,
      error,
      helperText,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={variant === 'error'}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'block w-full rounded-lg border bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
            variantStyles[variant],
            sizeStyles[inputSize],
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-danger-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
