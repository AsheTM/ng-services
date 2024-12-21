import { Pipe, PipeTransform } from '@angular/core';

import { ArraySort } from './array-sort.pipe';


@Pipe({
  name: 'arraySortDesc',
  standalone: true
})
export class ArraySortDesc extends ArraySort implements PipeTransform {

  transform<T>(list: T[]): T[];
  transform<T>(list: T[], key: keyof T): T[];
  transform<T>(list: T[], key?: keyof T): T[] {
    return super.transform(list, 'desc', key);
  }

}
