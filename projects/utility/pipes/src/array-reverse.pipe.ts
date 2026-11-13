import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'arrayReverse',
  standalone: true
})
export class ArrayReverse implements PipeTransform {

  /**
   * Reverses a copy, the list itself is left untouched
   */
  transform<T>(list: Maybe<T[]>): T[] {
    return [...(list ?? [])].reverse();
  }

}
