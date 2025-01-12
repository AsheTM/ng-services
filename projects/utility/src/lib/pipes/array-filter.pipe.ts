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
        || (String(typeof val === 'object' && key ? val[key] : val)).includes(String(filterBy));
    });
  }

}
