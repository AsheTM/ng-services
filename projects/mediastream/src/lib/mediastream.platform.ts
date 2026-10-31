export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof navigator !== 'undefined';
}
