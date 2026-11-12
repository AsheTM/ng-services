import { ArrayLast } from './array-last.pipe';


describe('ArrayLast', () => {
  const pipe = new ArrayLast();

  it('should return the last item', () => {
    // GIVEN
    const list: number[] = [1, 5, 10];

    // WHEN
    const result: number | undefined = pipe.transform(list);

    // THEN
    expect(result).toBe(10);
    expect(list).toEqual([1, 5, 10]);
  });

  it('should return undefined for an empty list, null or undefined', () => {
    // GIVEN
    // WHEN
    const results: (number | undefined)[] = [pipe.transform<number>([]), pipe.transform<number>(null), pipe.transform<number>(undefined)];

    // THEN
    expect(results).toEqual([undefined, undefined, undefined]);
  });
});
