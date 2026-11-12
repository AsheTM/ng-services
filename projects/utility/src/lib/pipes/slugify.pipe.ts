import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'slugify',
  standalone: true
})
export class Slugify implements PipeTransform {

  /**
   * Lower case, accents removed, anything that isn't a letter or a digit replaced by a single `-`
   */
  transform(value: string | null | undefined): string {
    return (value ?? '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
