import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { Maybe } from '@ashetm/types';


type RelativeTimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

// The part of `Intl.RelativeTimeFormat` used here (its types are not in the ES2018 lib)
interface RelativeTimeFormat {
  format(value: number, unit: RelativeTimeUnit): string;
}

const UNITS: [RelativeTimeUnit, number][] = [
  ['year', 365 * 24 * 60 * 60 * 1000],
  ['month', 30 * 24 * 60 * 60 * 1000],
  ['day', 24 * 60 * 60 * 1000],
  ['hour', 60 * 60 * 1000],
  ['minute', 60 * 1000],
  ['second', 1000]
];

/**
 * "3 minutes ago", "in 2 days", "yesterday"... in the app's language (`LOCALE_ID`) or the given locale.
 * Pure: it updates when the date changes, not as time passes.
 */
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgo implements PipeTransform {

  private readonly _locale: string = inject(LOCALE_ID);

  transform(value: Maybe<Date | number | string>, locale?: string, now: Date | number = Date.now()): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const time: number = new Date(value).getTime();

    if (isNaN(time)) {
      return '';
    }

    const difference: number = time - new Date(now).getTime();
    const [unit, size]: [RelativeTimeUnit, number] = UNITS.find(([, unitSize]: [RelativeTimeUnit, number]) => Math.abs(difference) >= unitSize) ?? UNITS[UNITS.length - 1];
    const format: RelativeTimeFormat = new (Intl as unknown as { RelativeTimeFormat: new (locale: string, options: { numeric: 'auto' }) => RelativeTimeFormat })
      .RelativeTimeFormat(locale ?? this._locale, { numeric: 'auto' });

    return format.format(Math.round(difference / size), unit);
  }

}
