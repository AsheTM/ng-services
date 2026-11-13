import { ArrayIsEmpty } from './array-is-empty.pipe';


describe('ArrayIsEmpty', () => {
  const pipe = new ArrayIsEmpty();

  it('should be true for an empty list, null or undefined', () => {
    // GIVEN
    // WHEN
    const results: boolean[] = [pipe.transform([]), pipe.transform(null), pipe.transform(undefined)];

    // THEN
    expect(results).toEqual([true, true, true]);
  });

  it('should be false for a list with items', () => {
    // GIVEN
    const list: number[] = [0];

    // WHEN
    const result: boolean = pipe.transform(list);

    // THEN
    expect(result).toBeFalse();
  });
});
