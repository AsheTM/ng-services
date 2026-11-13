import { Pipe, PipeTransform } from '@angular/core';
import { Entries } from '@ashetm/types';


@Pipe({
  name: 'objectEntries',
  standalone: true
})
export class ObjectEntries implements PipeTransform {

  /**
   * The `[key, value]` pairs of `value`, typed from its keys
   */
  transform<T extends object>(value: T): Entries<T> {
    return Object.entries(value) as Entries<T>;
  }

}
