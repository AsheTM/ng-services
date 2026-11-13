import { ArraySum } from './array-sum.pipe';


describe('ArraySum', () => {
  const pipe = new ArraySum();

  it('should sum the numbers', () => {
    // GIVEN
    const list: number[] = [1, 2, 3.5];

    // WHEN
    const result: number = pipe.transform(list);

    // THEN
    expect(result).toBe(6.5);
  });

  it('should sum the values of a key, ignoring values that are not numbers', () => {
    // GIVEN
    const list: Record<string, unknown>[] = [{ price: 10 }, { price: '5' }, { price: 2 }, {}];

    // WHEN
    const result: number = pipe.transform(list, 'price');

    // THEN
    expect(result).toBe(12);
  });

  it('should return 0 for an empty list, null or undefined', () => {
    // GIVEN
    // WHEN
    const results: number[] = [pipe.transform([]), pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual([0, 0, 0]);
  });
});
