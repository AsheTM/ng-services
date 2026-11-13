import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectFilter',
  standalone: true
})
export class ObjectFilter implements PipeTransform {

  /**
   * A new object with the entries matching `predicate`.
   * Without a predicate, drops `null`, `undefined` and `''` values.
   */
  transform<T extends object>(
    value: T | null | undefined,
    predicate: (entryValue: T[keyof T], key: keyof T) => boolean
      = (entryValue: T[keyof T]) => entryValue !== null && entryValue !== undefined && (entryValue as unknown) !== ''
  ): Partial<T> {
    const result: Partial<T> = {};

    (Object.keys(value ?? {}) as (keyof T)[]).forEach((key: keyof T) => {
      const entryValue: T[keyof T] = (value as T)[key];

      if (predicate(entryValue, key)) {
        result[key] = entryValue;
      }
    });

    return result;
  }

}
