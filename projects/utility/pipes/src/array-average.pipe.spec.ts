import { ArrayAverage } from './array-average.pipe';


describe('ArrayAverage', () => {
  const pipe = new ArrayAverage();

  it('should return the average of the numbers', () => {
    // GIVEN
    const list: number[] = [1, 2, 6];

    // WHEN
    const result: number | null = pipe.transform(list);

    // THEN
    expect(result).toBe(3);
  });

  it('should return the average of the values of a key, ignoring values that are not numbers', () => {
    // GIVEN
    const list: Record<string, unknown>[] = [{ score: 10 }, { score: 'n/a' }, { score: 20 }];

    // WHEN
    const result: number | null = pipe.transform(list, 'score');

    // THEN
    expect(result).toBe(15);
  });

  it('should return null when there is no number', () => {
    // GIVEN
    // WHEN
    const results: (number | null)[] = [pipe.transform([]), pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual([null, null, null]);
  });
});
