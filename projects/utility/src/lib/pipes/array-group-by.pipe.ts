import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayGroupBy',
  standalone: true
})
export class ArrayGroupBy implements PipeTransform {

  /**
   * Groups the items by the value of `key` (used as a string), keeping their order
   */
  transform<T>(list: T[] | null | undefined, key: keyof T): Record<string, T[]> {
    return (list ?? []).reduce((groups: Record<string, T[]>, item: T) => {
      const group: string = String(item[key]);

      (groups[group] ??= []).push(item);

      return groups;
    }, {});
  }

}
