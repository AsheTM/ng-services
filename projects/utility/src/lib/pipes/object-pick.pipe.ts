import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'objectPick',
  standalone: true
})
export class ObjectPick implements PipeTransform {

  /**
   * A new object with only the given keys (keys missing from the object are skipped)
   */
  transform<T extends object, K extends keyof T>(value: T | null | undefined, keys: K[]): Pick<T, K> {
    const result: Partial<Pick<T, K>> = {};

    keys.forEach((key: K) => {
      if (value && Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = value[key];
      }
    });

    return result as Pick<T, K>;
  }

}
