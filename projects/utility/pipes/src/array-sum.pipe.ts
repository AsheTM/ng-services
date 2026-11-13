import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'arraySum',
  standalone: true
})
export class ArraySum implements PipeTransform {

  /**
   * Sum of the numbers (or of the values of `key`); values that aren't finite numbers are ignored
   */
  transform(list: Maybe<number[]>): number;
  transform<T>(list: Maybe<T[]>, key: keyof T): number;
  transform<T>(list: Maybe<T[]>, key?: keyof T): number {
    return (list ?? [])
      .map((item: T): unknown => key !== undefined ? item?.[key] : item)
      .filter((value: unknown): value is number => typeof value === 'number' && Number.isFinite(value))
      .reduce((sum: number, value: number) => sum + value, 0);
  }

}
