import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayUnique',
  standalone: true
})
export class ArrayUnique implements PipeTransform {

  transform<T>(list: T[] | null | undefined): T[];
  transform<T>(list: T[] | null | undefined, key: keyof T): T[];
  transform<T>(list: T[] | null | undefined, key?: keyof T): T[] {
    const seen: Set<unknown> = new Set<unknown>();

    // The first occurrence is kept
    return (list ?? []).filter((item: T) => {
      const value: unknown = key !== undefined && item !== null && typeof item === 'object' ? item[key] : item;

      if (seen.has(value)) {
        return false;
      }

      seen.add(value);

      return true;
    });
  }

}
