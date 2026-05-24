import { forwardRef, useState, useRef, useEffect, useCallback, useId } from 'react';
import { cn } from '../../../utils/cn';
import type { Size } from '../../../utils/types';

export type SelectVariant = 'default' | 'error' | 'success';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  variant?: SelectVariant;
  size?: Size;
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const variantStyles: Record<SelectVariant, string> = {
  default:
    'border-neutral-300 focus:border-primary-500 focus:ring-primary-500 text-text-primary dark:border-neutral-600 dark:focus:border-primary-400 dark:focus:ring-primary-400',
  error:
    'border-danger-500 focus:border-danger-500 focus:ring-danger-500 text-text-primary dark:border-danger-400 dark:focus:border-danger-400 dark:focus:ring-danger-400',
  success:
    'border-success-500 focus:border-success-500 focus:ring-success-500 text-text-primary dark:border-success-400 dark:focus:border-success-400 dark:focus:ring-success-400',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      error,
      helperText,
      placeholder = 'Выберите...',
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled = false,
      className,
      id: externalId,
      name,
      required,
    },
    ref
  ) => {
    const internalId = useId();
    const id = externalId || internalId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const listboxId = `${id}-listbox`;

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const [activeIndex, setActiveIndex] = useState(-1);

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen((prev) => !prev);
        setActiveIndex(-1);
      }
    };

    const handleSelect = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;

        if (!isControlled) {
          setInternalValue(option.value);
        }
        onChange?.(option.value);
        setIsOpen(false);
        triggerRef.current?.focus();
      },
      [isControlled, onChange]
    );

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          listboxRef.current &&
          !listboxRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && activeIndex >= 0) {
            handleSelect(options[activeIndex]);
          } else {
            setIsOpen(true);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setActiveIndex((prev) => {
              const next = prev + 1;
              return next >= options.length ? 0 : next;
            });
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            setActiveIndex((prev) => {
              const next = prev - 1;
              return next < 0 ? options.length - 1 : next;
            });
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    useEffect(() => {
      if (isOpen && activeIndex >= 0 && listboxRef.current) {
        const activeOption = listboxRef.current.children[activeIndex] as HTMLElement;
        activeOption?.scrollIntoView?.({ block: 'nearest' });
      }
    }, [activeIndex, isOpen]);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={(node) => {
              (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            }}
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-invalid={variant === 'error'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            aria-required={required}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={cn(
              'flex items-center justify-between w-full rounded-lg border bg-white dark:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-left',
              variantStyles[variant],
              sizeStyles[size],
              !selectedOption && 'text-text-secondary',
              className
            )}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg
              className={cn('w-4 h-4 ml-2 transition-transform shrink-0', isOpen && 'rotate-180')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <ul
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              aria-label={label}
              className="absolute z-50 w-full mt-1 rounded-lg border bg-white dark:bg-neutral-800 shadow-lg overflow-auto max-h-60"
            >
              {options.length === 0 ? (
                <li className="px-3 py-2 text-text-secondary text-sm">Нет доступных вариантов</li>
              ) : (
                options.map((option, index) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={selectedValue === option.value}
                    aria-disabled={option.disabled}
                    className={cn(
                      'px-3 py-2 cursor-pointer transition-colors',
                      selectedValue === option.value &&
                        'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
                      activeIndex === index && 'bg-neutral-100 dark:bg-neutral-800',
                      option.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    {option.label}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
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
        {name && <input type="hidden" name={name} value={selectedValue} />}
      </div>
    );
  }
);

Select.displayName = 'Select';
