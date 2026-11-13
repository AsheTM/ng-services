import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'objectOmit',
  standalone: true
})
export class ObjectOmit implements PipeTransform {

  /**
   * A new object without the given keys
   */
  transform<T extends object, K extends keyof T>(value: Maybe<T>, keys: K[]): Omit<T, K> {
    const result: Partial<T> = { ...(value ?? {}) } as Partial<T>;

    keys.forEach((key: K) => delete result[key]);

    return result as Omit<T, K>;
  }

}
