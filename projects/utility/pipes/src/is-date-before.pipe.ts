import { Pipe, PipeTransform } from '@angular/core';

import { IsDate } from './is-date.pipe';


@Pipe({
  name: 'isDateBefore',
  standalone: true
})
export class IsDateBefore<T extends Date | number | string> extends IsDate<T> implements PipeTransform {

  transform(value: T, dateBefore: T): boolean {
    if(!super.isDate(value))
      return false;

    return new Date(value).getTime() < new Date(dateBefore).getTime();
  }

}
