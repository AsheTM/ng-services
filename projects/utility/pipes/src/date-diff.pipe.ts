import { Pipe, PipeTransform } from '@angular/core';


export type DateDiffUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';

const UNIT_SIZES: Record<DateDiffUnit, number> = {
  milliseconds: 1,
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000,
  weeks: 7 * 24 * 60 * 60 * 1000
};

/**
 * `value - other` in whole units (rounded toward zero); `null` when a date is missing or invalid
 */
@Pipe({
  name: 'dateDiff',
  standalone: true
})
export class DateDiff implements PipeTransform {

  transform(
    value: Date | number | string | null | undefined,
    other: Date | number | string | null | undefined,
    unit: DateDiffUnit = 'days'
  ): number | null {
    if (value === null || value === undefined || other === null || other === undefined) {
      return null;
    }

    const difference: number = new Date(value).getTime() - new Date(other).getTime();

    if (isNaN(difference)) {
      return null;
    }

    // `+ 0` turns -0 into 0
    return Math.trunc(difference / UNIT_SIZES[unit]) + 0;
  }

}
