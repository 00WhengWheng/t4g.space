// Simple utility functions for React Native
// Note: tailwind classes don't apply to React Native, so this is a simpler version

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Helper function to merge styles in React Native
export function mergeStyles<T>(...styles: (T | undefined | false | null)[]): T {
  return Object.assign({}, ...styles.filter(Boolean)) as T;
}