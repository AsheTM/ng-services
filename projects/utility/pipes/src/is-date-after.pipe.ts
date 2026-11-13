import { Pipe, PipeTransform } from '@angular/core';

import { IsDate } from './is-date.pipe';


@Pipe({
  name: 'isDateAfter',
  standalone: true
})
export class IsDateAfter<T extends Date | number | string> extends IsDate<T> implements PipeTransform {

  transform(value: T, dateAfter: T): boolean {
    if(!super.isDate(value))
      return false;

    return new Date(value).getTime() > new Date(dateAfter).getTime();
  }

}
