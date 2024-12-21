import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'dateMin',
  standalone: true
})
export class DateMin<T extends number | string | Date> implements PipeTransform {

  transform(value: T[]): Date {
    const dateTimestampList: number[] = value.map((item: T) => new Date(item).getTime());
    const maxDate: number =  Math.max(...dateTimestampList);

    return new Date(maxDate);
  }

}
