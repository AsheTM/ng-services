import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arraySort',
  standalone: true
})
export class ArraySort implements PipeTransform {

  transform<T>(list: T[]): T[];
  transform<T>(list: T[], direction: 'asc' | 'desc'): T[];
  transform<T>(list: T[], direction?: 'asc' | 'desc'): T[];
  transform<T>(list: T[], direction: 'asc' | 'desc', key?: keyof T): T[];
  transform<T>(list: T[], direction?: 'asc' | 'desc', key?: keyof T): T[];
  transform<T>(list: T[], direction: 'asc' | 'desc' = 'asc', key?: keyof T): T[] {
    return list.sort((item1: T, item2: T) => {
      return ((key ? (item1[key] > item2[key]) : (item1 > item2)) ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    })
  }

}
