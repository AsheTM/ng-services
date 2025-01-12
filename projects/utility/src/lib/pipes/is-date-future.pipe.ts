import { Pipe, PipeTransform } from '@angular/core';

import { IsDateAfter } from './is-date-after.pipe';


@Pipe({
  name: 'isDateFuture',
  standalone: true
})
export class IsDateFuture<T extends Date | number | string> extends IsDateAfter<T> implements PipeTransform {

  transform(value: T): boolean {
    return super.transform(value, Date.now() as T);
  }

}
