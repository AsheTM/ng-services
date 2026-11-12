import { TimeAgo } from './time-ago.pipe';


describe('TimeAgo', () => {
  const pipe = new TimeAgo('en-US');
  const now: number = new Date(2026, 0, 15, 12, 0, 0).getTime();
  const minute: number = 60 * 1000;
  const day: number = 24 * 60 * minute;

  it('should describe past dates', () => {
    // GIVEN
    const dates: number[] = [now - 3 * minute, now - 2 * 60 * minute, now - day, now - 3 * day];

    // WHEN
    const results: string[] = dates.map((date: number) => pipe.transform(date, undefined, now));

    // THEN
    expect(results).toEqual(['3 minutes ago', '2 hours ago', 'yesterday', '3 days ago']);
  });

  it('should describe future dates', () => {
    // GIVEN
    const dates: number[] = [now + day, now + 2 * day];

    // WHEN
    const results: string[] = dates.map((date: number) => pipe.transform(date, undefined, now));

    // THEN
    expect(results).toEqual(['tomorrow', 'in 2 days']);
  });

  it('should say now for the current time', () => {
    // GIVEN
    // WHEN
    const result: string = pipe.transform(now, undefined, now);

    // THEN
    expect(result).toBe('now');
  });

  it('should use the given locale', () => {
    // GIVEN
    // WHEN
    const result: string = pipe.transform(now - 3 * day, 'fr', now);

    // THEN
    expect(result).toBe('il y a 3 jours');
  });

  it('should return an empty string for null, undefined or an invalid date', () => {
    // GIVEN
    // WHEN
    const results: string[] = [pipe.transform(null), pipe.transform(undefined), pipe.transform('not a date')];

    // THEN
    expect(results).toEqual(['', '', '']);
  });
});
