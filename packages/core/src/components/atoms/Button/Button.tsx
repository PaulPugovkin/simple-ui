import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import type { Variant, Size } from '../../../utils/types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-400',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600',
  ghost: 'bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20 dark:focus:ring-primary-500',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 dark:bg-danger-500 dark:hover:bg-danger-600 dark:focus:ring-danger-400',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
