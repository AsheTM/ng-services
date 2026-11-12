import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'defaultValue',
  standalone: true
})
export class DefaultValue implements PipeTransform {

  /**
   * Returns `fallback` when the value is `null`, `undefined` or `''`; other values (`0`, `false`) are kept
   */
  transform<T, D>(value: T | null | undefined, fallback: D): T | D {
    return value === null || value === undefined || value === '' ? fallback : value;
  }

}
