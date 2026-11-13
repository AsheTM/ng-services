import { ArrayChunk } from './array-chunk.pipe';


describe('ArrayChunk', () => {
  const pipe = new ArrayChunk();

  it('should split the list into groups of the given size', () => {
    // GIVEN
    const list: number[] = [1, 2, 3, 4, 5];

    // WHEN
    const result: number[][] = pipe.transform(list, 2);

    // THEN
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  it('should treat a size below 1 as 1', () => {
    // GIVEN
    const list: number[] = [1, 2];

    // WHEN
    const result: number[][] = pipe.transform(list, 0);

    // THEN
    expect(result).toEqual([[1], [2]]);
  });

  it('should return an empty list for null or undefined', () => {
    // GIVEN
    // WHEN
    const results: number[][][] = [pipe.transform<number>(null, 2), pipe.transform<number>(undefined, 2)];

    // THEN
    expect(results).toEqual([[], []]);
  });
});
