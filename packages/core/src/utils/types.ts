export type { ClassValue } from 'clsx';

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
