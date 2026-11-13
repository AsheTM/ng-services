import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectHas',
  standalone: true
})
export class ObjectHas implements PipeTransform {

  /**
   * Whether every step of the path (`'address.city'` or `['address', 'city']`) exists, even with an `undefined` value
   */
  transform(value: unknown, path: string | (string | number)[]): boolean {
    const keys: (string | number)[] = Array.isArray(path) ? path : path.split('.').filter((key: string) => key !== '');
    let current: unknown = value;

    if (keys.length === 0) {
      return false;
    }

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object' || !(key in current)) {
        return false;
      }

      current = (current as Record<string | number, unknown>)[key];
    }

    return true;
  }

}
