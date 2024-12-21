import { Pipe, PipeTransform } from '@angular/core';

import { IsDate } from './is-date.pipe';


@Pipe({
  name: 'isDateBetween',
  standalone: true
})
export class IsDateBetween<T extends Date | number | string> extends IsDate<T> implements PipeTransform {

  transform(value: T, minDate: T, maxDate: T): boolean;
  transform(value: T, [minDate, maxDate]: [T, T]): boolean;
  transform(value: T, interval: T | [T, T], max?: T): boolean {
    if(super.isDate(value)) {
      return false;
    }

    const [minDate, maxDate]: [Date, Date]
      = Array.isArray(interval)
        ? [
          new Date(interval[0]!),
          new Date(interval[1]!)
        ]
        : [
          new Date(interval!),
          new Date(max!)
        ];

    const date: number = new Date(value).getTime();

    return minDate.getTime() < date && maxDate.getTime() > date;
  }

}
