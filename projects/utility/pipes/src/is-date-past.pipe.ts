import { Pipe, PipeTransform } from '@angular/core';

import { IsDateBefore } from './is-date-before.pipe';


@Pipe({
  name: 'isDatePast',
  standalone: true
})
export class IsDatePast<T extends Date | number | string> extends IsDateBefore<T> implements PipeTransform {

  transform(value: T): boolean {
    return super.transform(value, Date.now() as T);
  }

}
