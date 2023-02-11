import { ArrayFilter } from './array-filter.pipe';


describe('ArrayFilter', () => {
  const pipe = new ArrayFilter();
  const inputArray: Array<string | number | boolean>
    = [5, 'Test', true];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter array properly', () => {
    const expectedArray: typeof inputArray = pipe.transform(inputArray, 'true');

    expect(expectedArray).toHaveSize(1);
    expect(expectedArray[0]).toEqual(true);
  });
});
