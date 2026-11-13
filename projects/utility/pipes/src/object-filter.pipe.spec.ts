import { ObjectFilter } from './object-filter.pipe';


describe('ObjectFilter', () => {
  const pipe = new ObjectFilter();

  it('should drop null, undefined and empty string values by default', () => {
    // GIVEN
    const value: Record<string, unknown> = { a: 1, b: null, c: undefined, d: '', e: 0, f: false };

    // WHEN
    const result: Partial<Record<string, unknown>> = pipe.transform(value);

    // THEN
    expect(result).toEqual({ a: 1, e: 0, f: false });
    expect(Object.keys(value).length).toBe(6);
  });

  it('should keep the entries matching the predicate', () => {
    // GIVEN
    const value: Record<string, number> = { a: 1, b: 5, c: 10 };

    // WHEN
    const result: Partial<Record<string, number>> = pipe.transform(value, (entryValue: number) => entryValue > 2);

    // THEN
    expect(result).toEqual({ b: 5, c: 10 });
  });

  it('should return an empty object for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: object[] = [pipe.transform<Record<string, number>>(null), pipe.transform<Record<string, number>>(undefined)];

    // THEN
    expect(results).toEqual([{}, {}]);
  });
});
