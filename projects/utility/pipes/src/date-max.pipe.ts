import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@ashetm/types';


@Pipe({
  name: 'dateMax',
  standalone: true
})
export class DateMax<T extends number | string | Date> implements PipeTransform {

  transform(value: T[]): Nullable<Date> {
    // No date to compare
    if (value.length === 0) {
      return null;
    }

    const dateTimestampList: number[] = value.map((item: T) => new Date(item).getTime());
    const maxDate: number =  Math.max(...dateTimestampList);

    return new Date(maxDate);
  }

}
