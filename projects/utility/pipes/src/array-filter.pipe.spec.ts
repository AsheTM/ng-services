import { ArrayFilter } from './array-filter.pipe';


describe('ArrayFilter', () => {
  const pipe = new ArrayFilter();
  const inputArray: (string | number | boolean)[]
    = [5, 'Test', true];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter array properly', () => {
    const expectedArray: typeof inputArray = pipe.transform(inputArray, 'true');

    expect(expectedArray).toHaveSize(1);
    expect(expectedArray[0]).toEqual(true);
  });

  it('should not crash on null items when filtering by key', () => {
    // GIVEN
    const list: (Record<string, string> | null)[] = [{ name: 'apple' }, null, { name: 'banana' }];

    // WHEN
    const result: (Record<string, string> | null)[] = pipe.transform(list as Record<string, string>[], 'an', 'name');

    // THEN
    expect(result).toEqual([{ name: 'banana' }]);
  });
});
