import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@ashetm/types';


@Pipe({
  name: 'dateMin',
  standalone: true
})
export class DateMin<T extends number | string | Date> implements PipeTransform {

  transform(value: T[]): Nullable<Date> {
    // No date to compare
    if (value.length === 0) {
      return null;
    }

    const dateTimestampList: number[] = value.map((item: T) => new Date(item).getTime());
    const minDate: number = Math.min(...dateTimestampList);

    return new Date(minDate);
  }

}
