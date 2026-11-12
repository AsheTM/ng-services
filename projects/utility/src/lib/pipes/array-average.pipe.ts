import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayAverage',
  standalone: true
})
export class ArrayAverage implements PipeTransform {

  /**
   * Average of the numbers (or of the values of `key`); values that aren't finite numbers are ignored.
   * `null` when there is no number.
   */
  transform(list: number[] | null | undefined): number | null;
  transform<T>(list: T[] | null | undefined, key: keyof T): number | null;
  transform<T>(list: T[] | null | undefined, key?: keyof T): number | null {
    const values: number[] = (list ?? [])
      .map((item: T): unknown => key !== undefined ? item?.[key] : item)
      .filter((value: unknown): value is number => typeof value === 'number' && Number.isFinite(value));

    if (values.length === 0) {
      return null;
    }

    return values.reduce((sum: number, value: number) => sum + value, 0) / values.length;
  }

}
