import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'arrayLast',
  standalone: true
})
export class ArrayLast implements PipeTransform {

  transform<T>(list: Maybe<T[]>): T | undefined {
    return list?.[list.length - 1];
  }

}
