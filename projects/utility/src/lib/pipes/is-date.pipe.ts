import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'isDate',
  standalone: true
})
export class IsDate<T extends Date | number | string> implements PipeTransform {

  transform(value: T, ...args: any): boolean;
  transform(value: T): boolean {
    return this.isDate(value);
  }

  protected isDate(value: T): boolean {
    return value && !isNaN(new Date(value).getTime());
  }

}
