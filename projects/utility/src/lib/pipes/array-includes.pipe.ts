import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayIncludes',
  standalone: true
})
export class ArrayIncludes implements PipeTransform {

  transform<T>(list: T[], value: T): boolean {
    return list.includes(value);
  }

}
