import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayFilter',
  standalone: true
})
export class ArrayFilter<T extends string | number | boolean> implements PipeTransform {

  transform(value: T[]): T[];
  transform(value: T[], filterBy: T): T[];
  transform<U extends Record<number | string, any>>(value: U[], filterBy: T, key: string | number): U[];
  transform<U extends T | Record<number | string, any>>(value: U[], filterBy?: T, key?: string | number): U[] {
    return value.filter((val: U) => {
      return filterBy === undefined
        // `typeof null` is 'object', so `null` items are compared as values
        || (String(val !== null && typeof val === 'object' && key !== undefined ? val[key] : val)).includes(String(filterBy));
    });
  }

}
