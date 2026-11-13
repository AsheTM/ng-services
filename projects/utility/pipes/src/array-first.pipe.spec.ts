import { ArrayFirst } from './array-first.pipe';


describe('ArrayFirst', () => {
  const pipe = new ArrayFirst();

  it('should return the first item', () => {
    // GIVEN
    const list: number[] = [1, 5, 10];

    // WHEN
    const result: number | undefined = pipe.transform(list);

    // THEN
    expect(result).toBe(1);
  });

  it('should return undefined for an empty list, null or undefined', () => {
    // GIVEN
    // WHEN
    const results: (number | undefined)[] = [pipe.transform<number>([]), pipe.transform<number>(null), pipe.transform<number>(undefined)];

    // THEN
    expect(results).toEqual([undefined, undefined, undefined]);
  });
});
