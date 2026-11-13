import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { Maybe } from '@ashetm/types';


const UNITS: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

/**
 * A size in bytes, readable: `1536` → `'1.5 KB'` (1 KB = 1024 bytes), in the app's language (`LOCALE_ID`).
 * `''` for `null`, `undefined`, negative or invalid sizes.
 */
@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSize implements PipeTransform {

  private readonly _locale: string = inject(LOCALE_ID);

  transform(bytes: Maybe<number>, decimals: number = 1, locale?: string): string {
    if (bytes === null || bytes === undefined || !Number.isFinite(bytes) || bytes < 0) {
      return '';
    }

    const exponent: number = bytes === 0 ? 0 : Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1);
    const value: number = bytes / Math.pow(1024, exponent);
    const formatted: string = new Intl.NumberFormat(locale ?? this._locale, { maximumFractionDigits: decimals }).format(value);

    return `${formatted} ${UNITS[exponent]}`;
  }

}
