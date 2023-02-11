import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'isDate',
  standalone: true
})
export class IsDate implements PipeTransform {

  transform(value: any): boolean {
    return value && !isNaN(new Date(value).getTime());
  }

}
