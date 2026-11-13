import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'defaultValue',
  standalone: true
})
export class DefaultValue implements PipeTransform {

  /**
   * Returns `fallback` when the value is `null`, `undefined` or `''`; other values (`0`, `false`) are kept
   */
  transform<T, D>(value: Maybe<T>, fallback: D): T | D {
    return value === null || value === undefined || value === '' ? fallback : value;
  }

}
