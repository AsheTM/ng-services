import { Pipe, PipeTransform } from '@angular/core';
import { Maybe, ValueOf } from '@ashetm/types';


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
    value: Maybe<T>,
    predicate: (entryValue: ValueOf<T>, key: keyof T) => boolean
      = (entryValue: ValueOf<T>) => entryValue !== null && entryValue !== undefined && (entryValue as unknown) !== ''
  ): Partial<T> {
    const result: Partial<T> = {};

    (Object.keys(value ?? {}) as (keyof T)[]).forEach((key: keyof T) => {
      const entryValue: ValueOf<T> = (value as T)[key];

      if (predicate(entryValue, key)) {
        result[key] = entryValue;
      }
    });

    return result;
  }

}
