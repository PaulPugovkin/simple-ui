import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
      toHaveClass(...classNames: string[]): R;
      toBeDisabled(): R;
      toHaveFocus(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveValue(value: string | number | string[]): R;
      toContainHTML(html: string): R;
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toBeEmpty(): R;
    }
  }
}

export {};
