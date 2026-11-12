import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'arrayReverse',
  standalone: true
})
export class ArrayReverse implements PipeTransform {

  /**
   * Reverses a copy, the list itself is left untouched
   */
  transform<T>(list: T[] | null | undefined): T[] {
    return [...(list ?? [])].reverse();
  }

}
