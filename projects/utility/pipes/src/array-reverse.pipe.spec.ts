import { ArrayReverse } from './array-reverse.pipe';


describe('ArrayReverse', () => {
  const pipe = new ArrayReverse();

  it('should return a reversed copy', () => {
    // GIVEN
    const list: number[] = [1, 2, 3];

    // WHEN
    const result: number[] = pipe.transform(list);

    // THEN
    expect(result).toEqual([3, 2, 1]);
    expect(list).toEqual([1, 2, 3]);
  });

  it('should return an empty list for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: number[][] = [pipe.transform<number>(null), pipe.transform<number>(undefined)];

    // THEN
    expect(results).toEqual([[], []]);
  });
});
