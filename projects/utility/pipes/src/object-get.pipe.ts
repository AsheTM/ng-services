import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectGet',
  standalone: true
})
export class ObjectGet implements PipeTransform {

  /**
   * Reads a nested value by path (`'address.city'`, `'items.0.name'` or `['items', 0, 'name']`).
   * Returns `fallback` (default `undefined`) when a step of the path is missing.
   */
  transform<T = unknown>(value: unknown, path: string | (string | number)[], fallback?: T): T | undefined {
    const keys: (string | number)[] = Array.isArray(path) ? path : path.split('.').filter((key: string) => key !== '');
    let current: unknown = value;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object' || !(key in current)) {
        return fallback;
      }

      current = (current as Record<string | number, unknown>)[key];
    }

    return current === undefined ? fallback : current as T;
  }

}
