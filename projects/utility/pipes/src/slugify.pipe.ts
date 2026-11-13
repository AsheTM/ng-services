import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'slugify',
  standalone: true
})
export class Slugify implements PipeTransform {

  /**
   * Lower case, accents removed, anything that isn't a letter or a digit replaced by a single `-`
   */
  transform(value: Maybe<string>): string {
    return (value ?? '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
