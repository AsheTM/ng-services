import { Pipe, PipeTransform } from '@angular/core';

import { ArraySort } from './array-sort.pipe';


@Pipe({
  name: 'arraySortAsc',
  standalone: true
})
export class ArraySortAsc extends ArraySort implements PipeTransform {

  transform<T>(list: T[]): T[];
  transform<T>(list: T[], key: keyof T): T[];
  transform<T>(list: T[], key?: keyof T): T[] {
    return super.transform(list, 'asc', key);
  }

}
