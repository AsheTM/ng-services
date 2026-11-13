import { Pipe, PipeTransform } from '@angular/core';
import { Maybe } from '@ashetm/types';


@Pipe({
  name: 'truncate',
  standalone: true
})
export class Truncate implements PipeTransform {

  /**
   * Keeps the first `length` characters and adds `suffix` when the text is longer.
   * With `wholeWords`, the text is cut at the last space before `length` (if any).
   */
  transform(value: Maybe<string>, length: number, suffix: string = '…', wholeWords: boolean = false): string {
    const text: string = value ?? '';

    if (text.length <= length) {
      return text;
    }

    let cut: string = text.slice(0, Math.max(0, length));

    if (wholeWords) {
      const lastSpace: number = cut.lastIndexOf(' ');

      if (lastSpace > 0) {
        cut = cut.slice(0, lastSpace);
      }
    }

    return cut.replace(/\s+$/, '') + suffix;
  }

}
