import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayLast',
  standalone: true
})
export class ArrayLast implements PipeTransform {

  transform<T>(list: T[] | null | undefined): T | undefined {
    return list?.[list.length - 1];
  }

}
