import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arraySum',
  standalone: true
})
export class ArraySum implements PipeTransform {

  /**
   * Sum of the numbers (or of the values of `key`); values that aren't finite numbers are ignored
   */
  transform(list: number[] | null | undefined): number;
  transform<T>(list: T[] | null | undefined, key: keyof T): number;
  transform<T>(list: T[] | null | undefined, key?: keyof T): number {
    return (list ?? [])
      .map((item: T): unknown => key !== undefined ? item?.[key] : item)
      .filter((value: unknown): value is number => typeof value === 'number' && Number.isFinite(value))
      .reduce((sum: number, value: number) => sum + value, 0);
  }

}
