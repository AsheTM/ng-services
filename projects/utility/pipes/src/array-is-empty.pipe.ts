import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'arrayIsEmpty',
  standalone: true
})
export class ArrayIsEmpty implements PipeTransform {

  transform(list: Maybe<unknown[]>): boolean {
    return !list || list.length === 0;
  }

}
