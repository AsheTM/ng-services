import { Pipe, PipeTransform } from '@angular/core';
import { Maybe, PathValue, Paths } from '@ashetm/types';


// Types with a `string` index signature (`Record<string, unknown>`) accept any path: they use the untyped overload.
type TypedPath<T, P> = string extends Paths<T> ? never : P;


@Pipe({
  name: 'objectGet',
  standalone: true
})
export class ObjectGet implements PipeTransform {

  /**
   * Reads a nested value by path (`'address.city'`, `'items.0.name'` or `['items', 0, 'name']`).
   * Returns `fallback` (default `undefined`) when a step of the path is missing.
   * When the type of `value` is known and `path` is one of its paths, the return type is inferred.
   */
  transform<T extends object, P extends Paths<T>>(value: Maybe<T>, path: TypedPath<T, P>): PathValue<T, P> | undefined;
  transform<T extends object, P extends Paths<T>, F>(value: Maybe<T>, path: TypedPath<T, P>, fallback: F): Exclude<PathValue<T, P>, undefined> | F;
  transform<T = unknown>(value: unknown, path: string | (string | number)[], fallback?: T): T | undefined;
  transform(value: unknown, path: string | (string | number)[], fallback?: unknown): unknown {
    const keys: (string | number)[] = Array.isArray(path) ? path : path.split('.').filter((key: string) => key !== '');
    let current: unknown = value;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object' || !(key in current)) {
        return fallback;
      }

      current = (current as Record<string | number, unknown>)[key];
    }

    return current === undefined ? fallback : current;
  }

}
