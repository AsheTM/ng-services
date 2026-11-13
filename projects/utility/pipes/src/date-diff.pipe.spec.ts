import { DateDiff } from './date-diff.pipe';


describe('DateDiff', () => {
  const pipe = new DateDiff();

  it('should return the difference in days by default', () => {
    // GIVEN
    // WHEN
    const result: number | null = pipe.transform('2026-01-15', '2026-01-10');

    // THEN
    expect(result).toBe(5);
  });

  it('should return the difference in the given unit, rounded toward zero', () => {
    // GIVEN
    const value: Date = new Date(2026, 0, 1, 12, 0);
    const other: Date = new Date(2026, 0, 1, 10, 30);

    // WHEN
    const results: (number | null)[] = [pipe.transform(value, other, 'hours'), pipe.transform(value, other, 'minutes'), pipe.transform(other, value, 'hours')];

    // THEN
    expect(results).toEqual([1, 90, -1]);
  });

  it('should return null when a date is missing or invalid', () => {
    // GIVEN
    // WHEN
    const results: (number | null)[] = [pipe.transform(null, '2026-01-01'), pipe.transform('2026-01-01', undefined), pipe.transform('not a date', '2026-01-01')];

    // THEN
    expect(results).toEqual([null, null, null]);
  });
});
