import { ArrayPluck } from './array-pluck.pipe';

describe('SharedArrayPluckPipe', () => {
  const pipe = new ArrayPluck();
  const inputArray: Record<string | number, any>[]
    = [
      { a: 1, b: true },
      { a: 2 },
      { a: 3 },
      { a: 4, c: 'Test' },
    ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should filter array properly', () => {
    const expectedArray: any[] = pipe.transform(inputArray, 'b');

    expect(expectedArray).toHaveSize(1);
    expect(expectedArray[0]).toEqual(true);
  });

  it('should keep falsy values', () => {
    // GIVEN
    const list: Record<string, unknown>[] = [{ a: 0 }, { a: '' }, { a: false }, { a: null }, { b: 1 }];

    // WHEN
    const result: any[] = pipe.transform(list, 'a');

    // THEN
    expect(result).toEqual([0, '', false]);
  });
});
