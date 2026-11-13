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
    // Sorts a copy, the list itself is left untouched
    return [...list].sort((item1: T, item2: T) => {
      const value1: unknown = key ? item1[key] : item1;
      const value2: unknown = key ? item2[key] : item2;
      // Equal items return 0, so they keep their order
      const order: number = (value1 as any) < (value2 as any) ? -1 : (value1 as any) > (value2 as any) ? 1 : 0;

      return direction === 'asc' ? order : -order;
    });
  }

}
